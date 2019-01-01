---
title: "Single Instance"
draft: false
weight: 31
date: 2017-10-17T15:26:15Z
lastmod: 2018-12-05T15:26:15Z
---

## Deploy Single KubeMQ Instance

Deploying a single KubeMQ container can be done in two easy steps:

**Step One: Prepare a Host**

Prepare a Linux host and install Docker onto it. Use any Linux flavor supported by Docker.

For instructions on how to install Docker, see the instructions on [Docker](https://docs.docker.com/install/) website

**Step Two: Start KubeMQ**

```
$ sudo docker run -d --restart=unless-stopped -p 8080:8080 -p 9090:9090 -p 50000:50000 -v $PWD:/store  -e KUBEMQ_TOKEN="obtain-kubemq-token" kubemq/kubemq:latest
```
