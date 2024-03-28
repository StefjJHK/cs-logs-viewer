[![CodeQL](https://github.com/StefjJHK/cs-log-viewer/actions/workflows/codeql.yml/badge.svg)](https://github.com/StefjJHK/cs-log-viewer/actions/workflows/codeql.yml)
[![Docker Image](https://github.com/StefjJHK/cs-log-viewer/actions/workflows/docker-image.yml/badge.svg)](https://github.com/StefjJHK/cs-log-viewer/actions/workflows/docker-image.yml)
![logo](https://github.com/StefjJHK/cs-log-viewer/assets/66734934/b23253e0-2d7c-470b-9394-df435aff6882)

## The Web application for viewing and searching by structure logs
**Documentation available** [here](https://stefjjhk.github.io/cs-log-viewer/)
## Supports
- [Compact Log Event Format (CLEF)](https://clef-json.org/)
- Filter logs with [SearchJs](https://github.com/deitch/searchjs)
- Multiply log files uploading
- Storing uploaded logs in browser storage

## Search query
CS Logs viewer uses searchjs for search.
> Note: the application works with uploaded logs in **internal format**, add 'data.{field name}  at the top level of your query'.

### Example:
File Data:
```
{"@t":"2024-03-06T07:43:20.5672449Z","@mt":"Starting up", "@l":"Warning" "env":"Production"}
{"@t":"2024-03-06T07:43:22.7682431Z","@mt":"Health check", "@l":"Warning "env":"Staging"}
```
Search query:
```
{"data.@l":"Warning"}
```
Output: Logs with @l == 'Warning'

## Run
Application can be launched in docker envaironment using [official image](https://hub.docker.com/repository/docker/migiki/cs-logs-viewer/general)

### Examples:
docker run
`docker run -p 8080:80 --name cs-logs-viewer migiki/cs-logs-viewer:latest`

docker-compose
```yml
version: '3.8'  
services:  
  client:  
    image: "migiki/cs-logs-viewer:latest"
    container_name: cs-logs-viewer  
    ports:  
      - '8080:80'
```
