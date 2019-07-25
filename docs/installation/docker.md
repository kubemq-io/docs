---
title: Docker
lang: en-US
type: 'article'
description: 'KubeMQ docker installation'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue']
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
docker run -d -p 8080:8080 -p 50000:50000 -p 9090:9090 \
-v kubemq-vol:/store -e KUBEMQ_TOKEN=<YOUR_KUBEMQ_TOKEN> kubemq/kubemq

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


::: warning PROXY
If KubeMQ fails to load, probably there is a proxy server which prevents the validation of KubeMQ token.
In order to fix this, you can add -e KUBEMQ_PROXY="your-proxy-url" as an environment variable.
:::

## Verify Deployment

Browse to KubeMQ's API end-point with GET request to `/health` path and get a json response like below:

For Example:
``` bash
curl --location --request GET "http://localhost:8080/health" \
  --header "Content-Type: application/json"
```

We received:

``` json
[
    {
        "host": "DESKTOP-LNB7P20",
        "utc_time": "2019-07-23T06:59:26.9534018Z",
        "grpc": {
            "connections": {
                "total": 0,
                "events_senders": 0,
                "events_stream_senders": 0,
                "events_receivers": 0,
                "events_store_receivers": 0,
                "requests_senders": 0,
                "responses_senders": 0,
                "commands_receivers": 0,
                "queries_receivers": 0,
                "queue_senders": 0,
                "queue_receivers": 0
            },
            "traffic": {
                "sent_events": 0,
                "received_events": 0,
                "sent_requests": 0,
                "sent_error": 0,
                "sent_responses": 0,
                "received_requests": 0,
                "sent_events_vol": 0,
                "received_events_vol": 0,
                "sent_requests_vol": 0,
                "sent_errors_vol": 0,
                "sent_responses_vol": 0,
                "received_requests_vol": 0,
                "send_queue_messages_vol": 0,
                "receive_queue_messages_vol": 0,
                "send_queue_messages": 0,
                "receive_queue_messages": 0,
                "total_messages": 0,
                "total_volume": 0
            }
        },
        "rest": {
            "connections": {
                "total": 0,
                "events_senders": 0,
                "events_stream_senders": 0,
                "events_receivers": 0,
                "events_store_receivers": 0,
                "requests_senders": 0,
                "responses_senders": 0,
                "commands_receivers": 0,
                "queries_receivers": 0,
                "queue_senders": 0,
                "queue_receivers": 0
            },
            "traffic": {
                "sent_events": 0,
                "received_events": 0,
                "sent_requests": 0,
                "sent_error": 0,
                "sent_responses": 0,
                "received_requests": 0,
                "sent_events_vol": 0,
                "received_events_vol": 0,
                "sent_requests_vol": 0,
                "sent_errors_vol": 0,
                "sent_responses_vol": 0,
                "received_requests_vol": 0,
                "send_queue_messages_vol": 0,
                "receive_queue_messages_vol": 0,
                "send_queue_messages": 0,
                "receive_queue_messages": 0,
                "total_messages": 0,
                "total_volume": 0
            }
        }
    }
]

```