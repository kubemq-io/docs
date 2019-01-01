---
title: "Observability"
draft: false
weight: 46
date: 2017-10-17T15:26:15Z
lastmod: 2018-12-05T15:26:15Z
---
KubeMQ exports both metrics and tracing observability information by embedding [OpenCensus](https://opencensus.io/) library.

## General
General observability configuration can be set as below:

| Environment Variable   | Type  | Default | Description                                                        |
|:-----------------------|:------|:--------|:-------------------------------------------------------------------|
| METRICS_DISABLE        | bool  | `false` | Sets KubeMQ disable observability metrics exporting                |
| METRICS_TRACING_SAMPLE | float | `0.1`   | Sets KubeMQ tracing sample probability in percentage, i.e 0.1 =10% |

## Supported Backends
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

## Prometheus

| Environment Variable        | Type          | Default           | Description                                                                                                                  |
|:----------------------------|:--------------|:------------------|:-----------------------------------------------------------------------------------------------------------------------------|
| METRICS_PROMETHEUS_ENABLE   | bool          | `true`            | Enable/Disable Prometheus exporting                                                                                          |
| METRICS_PROMETHEUS_PATH     | string        | `/metrics`        | Sets Prometheus scraping end point (on KubeMQ service API address)                                                           |

## Honeycomb

| Environment Variable      | Type   | Default | Description                        |
|:--------------------------|:-------|:--------|:-----------------------------------|
| METRICS_HONEYCOMB_ENABLE  | bool   | `false` | Enable/Disable Honeycomb exporting |
| METRICS_HONEYCOMB_KEY     | string | ``      | Sets Honeycomb's key               |
| METRICS_HONEYCOMB_DATASET | string | ``      | Sets Honeycomb's dataset           |



## AWS X-Ray

| Environment Variable          | Type   | Default | Description                                     |
|:------------------------------|:-------|:--------|:------------------------------------------------|
| METRICS_AWS_ENABLE            | bool   | `false` | Enable/Disable AWS X-RAY exporting              |
| METRICS_AWS_ACCESS_KEY_ID     | string | ``      | Sets AWS access key id environment variable     |
| METRICS_AWS_SECRET_ACCESS_KEY | string | ``      | Sets AWS secret access key environment variable |
| METRICS_AWS_DEFAULT_REGION    | string | ``      | Sets AWS default region environment variable    |


## Datadog

| Environment Variable          | Type   | Default | Description                      |
|:------------------------------|:-------|:--------|:---------------------------------|
| METRICS_DATADOG_ENABLE        | bool   | `false` | Enable/Disable Datadog exporting |
| METRICS_DATADOG_TRACE_ADDRESS | string | ``      | Sets Datadog's trace address     |
| METRICS_DATADOG_STATS_ADDRESS | string | ``      | Sets Datadog's stats address     |


## Jeager

| Environment Variable             | Type   | Default | Description                     |
|:---------------------------------|:-------|:--------|:--------------------------------|
| METRICS_JEAGER_ENABLE            | bool   | `false` | Enable/Disable Jeager exporting |
| METRICS_JEAGER_COLLECTOR_ADDRESS | string | ``      | Sets Jeager collector address   |
| METRICS_JEAGER_AGENT_ADDRESS     | string | ``      | Sets Jeager agent address       |


## StackDriver

| Environment Variable              | Type   | Default | Description                                               |
|:----------------------------------|:-------|:--------|:----------------------------------------------------------|
| METRICS_STACKDRIVER_ENABLE        | bool   | `false` | Enable/Disable Stack Driver exporting                     |
| METRICS_STACKDRIVER_PROJECT_ID    | string | ``      | Sets StackDriver project id                               |
| METRICS_STACKDRIVER_MONITOR_CRDES | string | ``      | Sets StackDriver monitor(stats) credentials file location |
| METRICS_STACKDRIVER_TRACE_CREDS   | string | ``      | Sets StackDriver traces credentials file location         |


## Zipkin

| Environment Variable             | Type   | Default    | Description                     |
|:---------------------------------|:-------|:-----------|:--------------------------------|
| METRICS_ZIPKIN_ENABLE            | bool   | `true`     | Enable/Disable Zipkin exporting |
| METRICS_ZIPKEIN_REPORTER_ADDRESS | string | `/metrics` | Sets Zipkin's reporter address  |


