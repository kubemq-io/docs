---
title: "Get KubeMQ"
draft: false
weight: 30
date: 2017-10-17T15:26:15Z
lastmod: 2018-12-05T15:26:15Z
---
# Getting Started
 
## Register to KubeMQ
KubeMQ server is free to use anytime.
Registration is needed to obtain KubeMQ token is needed and can be done in [Register KubeMQ](https://account.kubemq.io/login/register).


## Get KubeMQ

### Quick Wizard
Please visit [Get KubeMQ](https://account.kubemq.io/home/get-kubemq/kubernetes) wizard for quick set up guide.

### Manually
KubeMQ is delivered via small Docker container. KubeMQ Docker container can be pulled from Docker Hub or by downloading a tar file from GitHub.

**Docker Hub:**

Run
```
$ sudo docker pull docker.io/kubemq/kubemq
```

**GitHub tar file:**

Option 1:
1. Download kubemq.tar from [GitHub](https://github.com/kubemq-io/kubemq/releases)
2. Run
```
$ sudo docker import kubemq.tar
```

Option 2:
```
$ sudo docker import https://github.com/kubemq-io/kubemq/releases/[tag:release]
```

