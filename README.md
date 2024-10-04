# Prerequisites

- Docker Engine + Compose

### docker-infra/home

- Create `docker-infra/home/.env` file with the following contents:
```
HDD_PATH=<...>
APP_DATA_PATH=<...>
ND_LASTFM_APIKEY=<...>
ND_LASTFM_SECRET=<...>
```
- `HDD_PATH`: local path to store slow-access data like movies, music, etc., e.g. `/media/hdd`
- `APP_DATA_PATH`: local path to store fast-access data like databases, caches, etc., e.g. `/var/lib/vsevolodganin.com`
- `ND_LASTFM_APIKEY`, `ND_LASTFM_SECRET`: Last.fm API secrets for Navidrome, follow [the official guide](https://www.navidrome.org/docs/usage/external-integrations/#lastfm) to acquire

# How to run

```sh
cd docker-infra/home
# or
cd docker-infra/cloud

docker compose up -d
```