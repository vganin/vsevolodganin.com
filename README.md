# Prerequisites

## Install dependencies

- Docker Engine + Compose

## Create files

### For home environment

- `docker-infra/home/.env`
  ```
  HDD_PATH=<...>
  APP_DATA_PATH=<...>
  ND_LASTFM_APIKEY=<...>
  ND_LASTFM_SECRET=<...>
  GIT_ACCESS_TOKEN=<...>
  WEBHOOK_SECRET=<...>
  ```
- `docker-infra/home/secrets/`
  - `ddns/api-key` 
    ```
    <...>
    ```
  - `beets/secret-config.yaml`
    ```
    fetchart:
        fanarttv_key: <...>
        lastfm_key: <...>
    
    subsonic:
        user: <...>
        pass: <...>
        auth: <...>
    ```


# Run

```sh
cd docker-infra/home
# or
cd docker-infra/cloud

docker compose up -d
```
