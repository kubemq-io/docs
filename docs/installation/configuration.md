---
title: Configuration
lang: en-US
type: 'article'
description: 'KubeMQ configuration manual'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue']
---
# KubeMQ Configuration
KubeMQ server can be configured via environment variables set during container loading.

## Table of Content
[[toc]]
## General

The KubeMQ general configuration can be set as below:

| Environment Variable | Type   | Default             | Description                                                                                                                                    |
|:---------------------|:-------|:--------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| KUBEMQ_TOKEN         | string | No Default          | Sets the KubeMQ token key                                                                                                                      |
| KUBEMQ_HOST          | string | container host name | Sets the docker container’s explicit host name                                                                                                |
| KUBEMQ_PORT          | int    | `8080`              | KubeMQ service API port for health, metrics and traces                                                                                         |
| KUBEMQ_LOG_LEVEL     | int    | `2`                 | Setting KubeMQ stdout log level where:  <ul><li>1 - Debug</li><li>2 - Info</li><li>3 - Warn</li><li>4 - Error</li></li><li>5 - Fatal</li></ul> |
| KubeMQ_PROXY         | string | ``                  | Set Proxy server address url access (in case license validation failure)                                                                        |


## Cluster
The KubeMQ cluster configuration can be set as below:

| Environment Variable | Type   | Default       | Description                                                        |
|:---------------------|:-------|:--------------|:-------------------------------------------------------------------|
| CLUSTER_ENABLE       | bool   | false         | Sets the KubeMQ clustering mode                                        |
| CLUSTER_ID           | string | `kubemq`      | Sets the KubeMQ cluster id as it is set in the kubernetes stateful set        |
| CLUSTER_PORT         | int    | `5228`        | Sets the KubeMQ cluster listening port                                 |
| CLUSTER_IS_SEED      | bool   | `false`       | Sets the current KubeMQ node as the seed (when not running as the stateful set |
| CLUSTER_ROUTES       | string | `kubemq:5228` | Sets the address of other KubeMQ nodes forming a cluster               |

## Persistence

The KubeMQ Queue configuration can be set as below:

| Environment Variable       | Type   | Default   | Description                                                                         |
|:---------------------------|:-------|:----------|:------------------------------------------------------------------------------------|
| STORE_CLEAN                | bool   | false     | true=KubeMQ will clean all the files in the store on boot                           |
| STORE_DIR                  | string | `./store` | Sets KubeMQ persistence folder                                                      |
| STORE_MAX_QUEUES           | int    | `0`       | Sets KubeMQ limit of the number of persistent channels/queues, 0 = unlimited        |
| STORE_MAX_SUBSCRIBERS      | int    | `0`       | Sets KubeMQ limit of the number of subscribers per channel/queue, 0 = unlimited     |
| STORE_MAX_MESSAGES         | int    | `0`       | Sets KubeMQ limit of the number of stored messages per channel/queue, 0 = unlimited |
| STORE_MAX_SIZE             | int    | `0`       | Sets KubeMQ max size in bytes per channel/queue, 0 = unlimited                      |
| STORE_MAX_RETENTION        | int    | `1440`    | Sets KubeMQ store time in minutes for each message per channel/queue, 0 = infinite  |
| STORE_MAX_INACTIVITY_PURGE | int    | `1440`    | Sets KubeMQ delete channel/queue due to inactivity time in minutes, 0 = no purging  |

## Queue

The KubeMQ persistence (Events Store) configuration can be set as below:

| Environment Variable               | Type | Default | Description                                                                                       |
|:-----------------------------------|:-----|:--------|:--------------------------------------------------------------------------------------------------|
| QUEUE_MAX_NUMBER_OF_MESSAGE        | int  | `1024`  | Sets max of sending / receiving batch of queue messages, default 1024, 0 is unlimited             |
| QUEUE_MAX_WAIT_TIMEOUT_SECONDS     | int  | `3600`  | Sets max expiration allowed for message, default 43200 seconds, 12 hours                          |
| QUEUE_MAX_EXPIRATION_SECONDS       | int  | `43200` | Sets max expiration allowed for message, default 43200 seconds, 12 hours                          |
| QUEUE_MAX_DELAY_SECONDS            | int  | `43200` | Sets max delay seconds allowed for message, default 43200 seconds, 12 hours                       |
| QUEUE_MAX_RECEIVE_COUNT            | int  | `16`    | Sets max retires to receive message before discard, default 16 times                              |
| QUEUE_MAX_VISIBILITY_SECONDS       | int  | `43200` | Sets max time of hold received message before returning to queue, default 43200 seconds, 12 hours |
| QUEUE_DEFAULT_VISIBILITY_SECONDS   | int  | `60`    | Sets default time of hold received message before returning to queue, default 60 seconds          |
| QUEUE_DEFAULT_WAIT_TIMEOUT_SECONDS | int  | `1`     | Sets default time to wait for a message in a queue, default 1 second                              |



## gRPC Interface
The KubeMQ GRPC interface configuration can be set as below:

| Environment Variable    | Type   | Default   | Description                                                    |
|:------------------------|:-------|:----------|:---------------------------------------------------------------|
| GRPC_ENABLE             | bool   | `true`    | Enable/Disable the gRPC interface                                  |
| GRPC_PORT               | int    | `50000`   | Docker exposed port                                            |
| GRPC_SECURITY_TLS_MODE  | string | `none`    | `none` = no security, `tls` = TLS secured                      |
| GRPC_SECURITY_CERT_FILE | string | ``        | CERT file name and location                                    |
| GRPC_SECURITY_KEY_FILE  | string | ``        | Key file name and location                                     |
| GRPC_SUB_BUFF_SIZE      | int    | `100`     | Sets the subscribe message / requests buffer size to use on the server |
| GRPC_BODY_LIMIT         | int    | `4194304` | Sets request body limit in bytes (must be > 0)                 |



## REST Interface
KubeMQ REST interface configuration can be set as below:

| Environment Variable        | Type          | Default           | Description                                                                                                                  |
|:----------------------------|:--------------|:------------------|:-----------------------------------------------------------------------------------------------------------------------------|
| REST_ENABLE                 | bool          | `true`            | Enable/Disable REST interface                                                                                                |
| REST_PORT                   | int           | `9090`            | Docker exposed port                                                                                                          |
| REST_SECURITY_TLS_MODE      | string        | `none`            | `none` = no security, `tls` = TLS secured                                                                                    |
| REST_SECURITY_CERT_FILE     | string        | ``                | CERT file name and location                                                                                                  |
| REST_SECURITY_KEY_FILE      | string        | ``                | Key file name and location                                                                                                   |
| REST_READ_TIMEOUT           | int           | `60`              | REST read timeout in seconds                                                                                                 |
| REST_WRITE_TIMEOUT          | int           | `60`              | REST write timeout in seconds                                                                                                |
| REST_SUB_BUFF_SIZE          | int           | `100`             | Sets subscribe message / requests buffer size to use on server                                                               |
| REST_BODY_LIMIT             | string        | ``                | Sets request body limit, (i.e. 2M), limit can be specified as 4x or 4xB, where x is one of the multiple from K, M, G, T or P |
| REST_CORS_ALLOW_ORIGINS     | strings array | `{*}`             | Sets a list of origins that may access the resource                                                                          |
| REST_CORS_ALLOW_METHODS     | strings array | `{"GET", "POST"}` | Sets a list of methods that may access the resource                                                                          |
| REST_CORS_ALLOW_HEADERS     | strings array | `{}`              | Sets a list of request headers that can be used when making the actual request                                               |
| REST_CORS_ALLOW_CREDENTIALS | bool          | `false`           | Sets whether or not the response to the request can be exposed when the credentials flag is true                             |
| REST_CORS_EXPOSE_HEADERS    | strings array | `{}`              | Sets a whitelist headers that clients are allowed to access                                                                  |
| REST_CORS_MAX_AGE           | int           | `0`               | Sets how long (in seconds) the results of a pre-flight request can be cached                                                 |

## Logging

KubeMQ supports stdout logging, in addition to docker sending logs to local files and to the [Logly](https://www.loggly.com/) external service.

| Environment Variable     | Type   | Default    | Description                                                                      |
|:-------------------------|:-------|:-----------|:---------------------------------------------------------------------------------|
| LOG_FILE_ENABLE          | bool   | `false`    | Enable/Disable saving logs to file                                               |
| LOG_FILE_PATH            | string | `./log`    | Sets docker container explicit host name                                      |
| LOG_LOGGLY_ENABLE         | bool   | `false`    | Enable/Disable sensing logs to [Logly](https://www.loggly.com/) external service |
| LOG_LOGGLY_KEY            | string | No Default | Loggly access key                                                                 |
| LOG_LOGGLY_FLUSH_INTERVAL | int    | 5          | Loggly sending logs interval in seconds                                           |



## Observability

KubeMQ exports both metrics and tracing observability information by embedding the [OpenCensus](https://opencensus.io/) library.


The general observability configuration can be set as below:


| Environment Variable   | Type  | Default | Description                                                        |
|:-----------------------|:------|:--------|:-------------------------------------------------------------------|
| METRICS_DISABLE        | bool  | `false` | Sets KubeMQ and disables observability metrics exporting                |
| METRICS_TRACING_SAMPLE | float | `0.1`   | Sets KubeMQ tracing sample probability as a percentage, i.e 0.1 =10% |


The following backend systems are supported:

| Backend                                                     | Stats | Tracing |
|:------------------------------------------------------------|:------|:--------|
| [Prometheus](https://prometheus.io/)                        | Yes   | No      |
| [Honeycomb](https://www.honeycomb.io/)                      | No    | Yes     |
| [AWS X-Ray](https://console.aws.amazon.com/xray/home)       | No    | Yes     |
| [Datadog](https://www.datadoghq.com/)                       | Yes   | Yes     |
| [Jeager](https://www.jaegertracing.io/)                     | No    | Yes     |
| [StackDriver](https://console.cloud.google.com/monitoring) | Yes   | Yes     |
| [Zimpkin](https://zipkin.io/)                               | No    | Yes     |

### Prometheus

| Environment Variable        | Type          | Default           | Description                                                                                                                  |
|:----------------------------|:--------------|:------------------|:-----------------------------------------------------------------------------------------------------------------------------|
| METRICS_PROMETHEUS_ENABLE   | bool          | `true`            | Enable/Disable Prometheus exporting                                                                                          |
| METRICS_PROMETHEUS_PATH     | string        | `/metrics`        | Sets Prometheus scraping end point (on the KubeMQ service API address)                                                           |

### Honeycomb

| Environment Variable      | Type   | Default | Description                        |
|:--------------------------|:-------|:--------|:-----------------------------------|
| METRICS_HONEYCOMB_ENABLE  | bool   | `false` | Enable/Disable Honeycomb exporting |
| METRICS_HONEYCOMB_KEY     | string | ``      | Sets Honeycomb's key               |
| METRICS_HONEYCOMB_DATASET | string | ``      | Sets Honeycomb's dataset           |



### AWS X-Ray

| Environment Variable          | Type   | Default | Description                                     |
|:------------------------------|:-------|:--------|:------------------------------------------------|
| METRICS_AWS_ENABLE            | bool   | `false` | Enable/Disable AWS X-RAY exporting              |
| METRICS_AWS_ACCESS_KEY_ID     | string | ``      | Sets AWS access key id environment variable     |
| METRICS_AWS_SECRET_ACCESS_KEY | string | ``      | Sets AWS secret access key environment variable |
| METRICS_AWS_DEFAULT_REGION    | string | ``      | Sets AWS default region environment variable    |


### Datadog Configuration

| Environment Variable          | Type   | Default | Description                      |
|:------------------------------|:-------|:--------|:---------------------------------|
| METRICS_DATADOG_ENABLE        | bool   | `false` | Enable/Disable Datadog exporting |
| METRICS_DATADOG_TRACE_ADDRESS | string | ``      | Sets Datadog's trace address     |
| METRICS_DATADOG_STATS_ADDRESS | string | ``      | Sets Datadog's stats address     |


### Jeager

| Environment Variable             | Type   | Default | Description                     |
|:---------------------------------|:-------|:--------|:--------------------------------|
| METRICS_JEAGER_ENABLE            | bool   | `false` | Enable/Disable Jeager exporting |
| METRICS_JEAGER_COLLECTOR_ADDRESS | string | ``      | Sets Jeager collector address   |
| METRICS_JEAGER_AGENT_ADDRESS     | string | ``      | Sets Jeager agent address       |


### StackDriver

| Environment Variable              | Type   | Default | Description                                               |
|:----------------------------------|:-------|:--------|:----------------------------------------------------------|
| METRICS_STACKDRIVER_ENABLE        | bool   | `false` | Enable/Disable Stack Driver exporting                     |
| METRICS_STACKDRIVER_PROJECT_ID    | string | ``      | Sets StackDriver project id                               |
| METRICS_STACKDRIVER_MONITOR_CRDES | string | ``      | Sets StackDriver monitor(stats)credentials file location |
| METRICS_STACKDRIVER_TRACE_CREDS   | string | ``      | Sets StackDriver traces credentials file location         |


### Zipkin

| Environment Variable             | Type   | Default    | Description                     |
|:---------------------------------|:-------|:-----------|:--------------------------------|
| METRICS_ZIPKIN_ENABLE            | bool   | `true`     | Enable/Disable Zipkin exporting |
| METRICS_ZIPKEIN_REPORTER_ADDRESS | string | `/metrics` | Sets Zipkin's reporter address  |



