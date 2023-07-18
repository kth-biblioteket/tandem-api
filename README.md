# KTHB Tandem api
API mot Tandem

##

###


#### Dependencies

Node 16.13.2

##### Installation

1.  Skapa folder på server med namnet på repot: "/local/docker/tandem-api"
2.  Skapa och anpassa docker-compose.yml i foldern
```
version: '3.6'

services:
  tandem-api:
    container_name: tandem-api
    image: ghcr.io/kth-biblioteket/tandem-api:${REPO_TYPE}
    restart: always
    environment:
      - TZ=${TZ}
    env_file:
      - ./tandem-api.env
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.tandem-api.rule=Host(`${DOMAIN_NAME}`) && PathPrefix(`${PATHPREFIX}`)"
      - "traefik.http.routers.tandem-api.entrypoints=websecure"
      - "traefik.http.routers.tandem-api.tls=true"
      - "traefik.http.routers.tandem-api.tls.certresolver=myresolver"
    networks:
      - "apps-net"

networks:
  apps-net:
    external: true
```
3.  Skapa och anpassa .env(för composefilen) i foldern
```
PATHPREFIX=/tandem
DOMAIN_NAME=api-ref.lib.kth.se
API_ROUTES_PATH=/v1
```
4.  Skapa och anpassa tandem-api.env (för applikationen) i foldern
```
PORT=8080
SECRET=xxxxx
API_KEY_READ=xxxxx
API_KEY_WRITE=xxxxx
DB_DATABASE=tandemlearn
DB_USER=tandem
DB_PASSWORD=xxxxx
DB_ROOT_PASSWORD=xxxxxx
API_ROUTES_PATH=/v1
CORS_WHITELIST="http://localhost, https://apps.lib.kth.se, https://apps-ref.lib.kth.se, https://www.kth.se"
ENVIRONMENT=development
```
5. Skapa deploy_ref.yml i github actions
6. Skapa deploy_prod.yml i github actions
7. Github Actions bygger en dockerimage i github packages
8. Starta applikationen med docker compose up -d --build i "local/docker/tandem-api"

