# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Infrastructure-as-config for two hosts plus a small personal website. There is no test suite or linter; "building" means validating Compose/Caddy config or building the Next.js site.

- `docker-infra/home/` — the home server stack (the bulk of the repo): one `docker-compose.yml` with media, download, monitoring, AI, notes, and SSO services, fronted by Caddy.
- `docker-infra/cloud/` — the public `vsevolodganin.com` host: builds `website-src/` and serves it behind `jonasal/nginx-certbot` (auto Let's Encrypt).
- `website-src/` — Next.js 14 (pages router) + MUI site. Pages live in `pages/`, theme in `src/theme.tsx`, static assets (CV, icons) in `public/`.

## Commands

```sh
# Website
cd website-src && npm ci && npm run dev     # local dev server
cd website-src && npm run build              # production build (also what the Dockerfile runs)

# Validate Compose config (needs a .env with the required vars, see below)
cd docker-infra/home && docker compose config -q

# Run a stack
cd docker-infra/home && docker compose up -d   # or docker-infra/cloud

# Validate the Caddyfile
docker run --rm -v "$PWD/docker-infra/home/Caddyfile:/etc/caddy/Caddyfile:ro" caddy:2.11.9-alpine caddy validate --config /etc/caddy/Caddyfile
```

## Deployment

`.github/workflows/deploy.yml` deploys only the **home** stack on every push to `main`: it SSHes into the home server, runs `git pull` in `/home/vsga/vsevolodganin.com/docker-infra/home`, then pulls and recreates **only the services already running** (`docker compose ps --services --status running`). So a newly added service is not started by CI; it has to be brought up manually on the host once. The cloud stack is deployed by hand.

Dependabot (`.github/dependabot.yml`) bumps image tags in `docker-infra/home/docker-compose.yml` weekly; Beszel images are grouped. Images are pinned to exact versions (or digests), so keep that convention when adding services.

## Home stack architecture

- **Ingress**: Caddy is the only service publishing 80/443 (plus a few P2P ports: qBittorrent 13627, slskd 50300). Every web UI gets a `<name>.vsevolodganin.com` block in `Caddyfile` that proxies to the Compose service name and internal port. Adding a service generally means adding both a Compose service and a Caddyfile block. `ddns` keeps `home.vsevolodganin.com` pointed at the house via Cloudflare.
- **Host-network services**: `plex` and `beszel-agent` use `network_mode: host`; Caddy reaches Plex via `host.docker.internal:32400` (`extra_hosts: host-gateway`).
- **SSO**: Authentik (`authentik-server`, `authentik-worker`, `authentik-postgresql`) at `auth.vsevolodganin.com`. Configuration is declarative via blueprints in `authentik-blueprints/` (mounted to `/blueprints/custom`). Currently only Navidrome is behind it: Caddy uses `forward_auth` to the embedded outpost and passes `X-Authentik-Username` as `Remote-User`; Navidrome trusts it via `ExtAuth.TrustedSources = "@"`, which works because Navidrome listens on a **unix socket** shared with Caddy through the `navidrome-socket` volume. `/rest/*` (Subsonic API) and `/share/*` bypass SSO. Putting another app behind SSO means: a proxy provider + application in `home.yaml`, adding the provider to the embedded outpost, and the same `forward_auth` pattern in the Caddyfile.
- **Music pipeline**: lidarr / slskd / qBittorrent / pyload download into `${HDD_PATH}/downloads/*`; `beets-flask` imports into `${HDD_PATH}/musick` using `beets.yaml` (custom plugins in `beetsplug/`, extra pip deps in `beets-flask-requirements.txt`, apt deps in `beets-flask-startup.sh`); Navidrome serves `musick` read-only with its scanner disabled — beets' `subsonicupdate` plugin triggers rescans.
- **Config vs. state**: config files tracked in this repo are bind-mounted read-only (`./x:/path:ro`); all mutable state lives under `${APP_DATA_PATH}/<service>/`, media under `${HDD_PATH}`.
- **Monitoring**: Beszel hub + agent (agent gets `/dev/sda` and `SYS_RAWIO` for SMART, disk mounts under `/extra-filesystems/<dev>__<name>`); Dozzle for container logs/actions.

## Required untracked files (home)

These are gitignored and must exist on the host for `docker compose` to work (all vars use `${VAR:?error}`, so missing ones fail fast):

- `docker-infra/home/.env`: `HDD_PATH`, `APP_DATA_PATH`, `ND_LASTFM_APIKEY`, `ND_LASTFM_SECRET`, `OBSIDIAN_COUCHDB_USER`, `OBSIDIAN_COUCHDB_PASSWORD`
- `docker-infra/home/secrets/`:
  - `ddns/api-key`
  - `beets/secret-config.yaml` (included by `beets.yaml`; holds `fetchart.fanarttv_key`, `fetchart.lastfm_key`, `subsonic.user/pass/auth`)
  - `authentik/secret-key`, `authentik/postgres-password`, `authentik/smtp-password`
  - `authentik/bootstrap.env` (optional; initial admin bootstrap)

Secrets are passed as Compose `secrets` and read from `/run/secrets/...` (Authentik uses `file://` env values) — follow that pattern rather than putting secrets in `.env` or tracked files.

Files under `secrets/` must be group-readable by `vsga` (dirs `2770`, files `660`/`770`), not `600`: the CI deploy SSHes in as a different user in the `vsga` group, and files the compose client reads itself (e.g. `env_file: secrets/authentik/bootstrap.env`) otherwise fail with "permission denied".
