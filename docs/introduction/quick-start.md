---
title: 'Quick Start'
lang: en-US
type: 'article'
description: 'Get started with KubeMQ'
tags: ['pub/sub','message broker','KubeMQ']
---

# KubeMQ Quick Start
**Welcome to KubeMQ!**

In this guide, we’ll walk you through how to install KubeMQ into your Kubernetes cluster. Then we’ll send and receive messages to verify your KubeMQ installation.

Installing KubeMQ is easy. First, you will install kubemqctl the KubeMQ CLI (command-line interface) onto your local machine. Using this CLI, you’ll then install KubeMQ cluster into your Kubernetes cluster. Finally, you’ll send a hello-world message to a queue and retrieve the message for verification of proper KubeMQ cluster installation.

## Step 0 - Setup

Before we can do anything, we need to ensure you have access to a Kubernetes cluster running 1.12 or later, and a functioning kubectl command on your local machine. (One easy option is to run Kubernetes on your local machine. We suggest [Docker Desktop](https://www.docker.com/products/docker-desktop) or [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/), but there are [many options](https://kubernetes.io/docs/setup/).)

When ready, make sure you’re running a recent version of Kubernetes with:

```bash
kubectl version --short
```

In the next step, we will install the kubemqctl the KubeMQ CLI and validate that your cluster is ready to send and receive messages.


## Step 1 - Get KubeMQ CLI - kubemqctl

### macOS / Linux

```bash
curl -sL https://get.kubemq.io/install | sh 
```
### Windows

#### Option 1:

- [Download the latest kubemqctl.exe](https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl.exe).
- Place the file under e.g. `C:\Program Files\kubemqctl\kubemqctl.exe`
- Add that directory to your system path to access it from any command prompt

#### Option 2:
Run in PowerShell as administrator:

```powershell
New-Item -ItemType Directory 'C:\Program Files\kubemqctl'
Invoke-WebRequest https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl.exe -OutFile 'C:\Program Files\kubemqctl\kubemqctl.exe'
[Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine) + ';C:\Program Files\kubemqctl', [EnvironmentVariableTarget]::Machine)
$env:Path += ';C:\Program Files\kubemqctl'
```


## Step 2 - Create KubeMQ Cluster

Run kubemqctl create cluster command:

``` bash
kubemqctl cluster create -t <YOUR_KUBEMQ_TOKEN>
```


## Step 3 - Send 'hello-world'

``` bash
kubemqctl queue send q1 hello-world
```

## Step 4 - Get 'hello-world'

``` bash
kubemqctl queue receive q1
```


## Demo

KubeMQ Quick Start:

<div class="video-block">
    <iframe width="1280" height="720"
      src="https://www.youtube.com/embed/W3gWRZUcuUw" frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
</div>

## Learn More

### Get Started with Patterns

- [Get Started with Queue Message Pattern](../get_started/queue.md)
- [Get Started with Pub/Sub Message Pattern](../get_started/pubsub.md)
- [Get Started with RPC Message Pattern](../get_started/rpc.md)

### Messages Patterns and Core Concepts

- [Core Concepts](../tutorials/concepts.md)
- [Queue Message Pattern](../tutorials/queue.md)
- [Pub/Sub Message Pattern](../tutorials/pubsub.md)
- [RPC Message Pattern](../tutorials/rpc.md)

### Development

- [Go SDK](../development/go.md)
- [.Net SDK](../development/net.md)
- [Java SDK](../development/java.md)
- [Python SDK](../development/python.md)
- [Rest Reference](../development/rest.md)
