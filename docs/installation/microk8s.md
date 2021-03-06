---
title: MicroK8s
lang: en-US
type: 'article'
description: 'KubeMQ MicroK8s cluster deployment.'
tags: ['pub/sub','message broker','KubeMQ','Kubernetes','docker','cloud native','message queue','edge']
---
# MicroK8s Deployment
## Table of Content
[[toc]]
## General
KubeMQ can be deployed in a Canonical's MicroK8s Kubernetes cluster as a StatefulSet.

MicroK8s , is the smallest, fastest, fully-conformant Kubernetes that tracks upstream releases and makes clustering trivial. MicroK8s is great for offline development, prototyping, and testing. Use it on a VM as a small, cheap, reliable k8s for CI/CD. The best kubernetes for appliances. Develop IoT apps for k8s and deploy them to MicroK8s on your Linux boxes.

::: tip KubeMQ Token
Every installation method requires a KubeMQ token.
Please [register](https://account.kubemq.io/login/register?destination=docker) to obtain your KubeMQ token.
:::

## Install kubemqctl

The easiest way to deploy KubeMQ cluster is via kubemqctl CLI tool.

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

## Install MicroK8s

Install MicroK8s as described in [https://microk8s.io/#get-started](https://microk8s.io/#get-started)

**Important: Make sure you have enabled DNS and Registry as described on Step 3**


## Configure kubemqctl

Configure kubemqctl config file by running the following command:

``` bash
kubemqctl config
```

Set installation destination to "MicroK8s"

## Deploy KubeMQ Cluster

Run kubemqctl create cluster command:

``` bash
kubemqctl cluster create -t <YOUR_KUBEMQ_TOKEN>
```

For Example:

![kubemqctl-create-basic.gif](./images/kubemqctl-create-basic.gif)

