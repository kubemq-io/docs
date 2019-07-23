---
title: Docker
lang: en-US
---
# Docker Deployment

KubeMQ can be deployed as a single docker container or as a service in a docker-compose file.

## Table of Content
[[toc]]



::: tip KubeMQ Token
Every installation method requires a KubeMQ token.
Please [register](https://account.kubemq.io/login/register?destination=docker) to obtain your KubeMQ token.
:::



## Docker Command

Pull and run KubeMQ Docker container:
``` bash
docker run -d -p 8080:8080 -p 50000:50000 -p 9090:9090 -v kubemq-vol:/store -e KUBEMQ_TOKEN=<YOUR_KUBEMQ_TOKEN> kubemq/kubemq

```


## Docker Compose

Run :

``` bash
docker-compose -d up
```

With the following yaml file named docker-compose.yaml:

``` yaml
version: '3.7'
services:
  kubemq:
    image: kubemq/kubemq
    container_name: kubemq
    ports:
      - "8080:8080"
      - "9090:9090"
      - "50000:50000"
    environment:
      - KUBEMQ_HOST=kubemq
      - KUBEMQ_TOKEN=<YOUR_KUBEMQ_TOKEN>
    networks:
      - backend
      - frontend
    volumes:
      - kubemq_vol:/store
networks:
  backend:
volumes:
  kubemq_vol:
```
