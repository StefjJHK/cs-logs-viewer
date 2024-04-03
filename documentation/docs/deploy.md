# CS Logs viewer deploy
You can deploy project to local machine or to server using [official docker image](https://hub.docker.com/repository/docker/migiki/cs-logs-viewer/general). 

Example with `docker-compose.yml`
```yml
version: "3.8"
services:
  client:
    image: "migiki/cs-logs-viewer:latest"
    container_name: cs-logs-viewer
    ports:
      - "8080:80"
```