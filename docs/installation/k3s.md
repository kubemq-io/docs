---
title: K3s
lang: en-US
type: 'article'
description: 'KubeMQ K3s cluster deployment.'
tags: ['pub/sub','message broker','KubeMQ','Kubernetes','docker','cloud native','message queue','edge']
---
# K3s Deployment
## Table of Content
[[toc]]
## General
KubeMQ can be deployed in a Rancher's K3s Kubernetes cluster as a StatefulSet.

K3S is a highly available, certified Kubernetes distribution designed for production workloads in unattended, resource-constrained, remote locations or inside IoT appliances.


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

## Install K3s

Install K3s as described in [https://github.com/rancher/k3s/blob/master/README.md](https://github.com/rancher/k3s/blob/master/README.md)



## Configure kubemqctl

Configure kubemqctl config file by running the following command:

``` bash
kubemqctl config
```

Set installation destination to "K3s"

## Deploy KubeMQ Cluster

Run kubemqctl create cluster command:

``` bash
kubemqctl cluster create -t <YOUR_KUBEMQ_TOKEN>
```

For Example:

![kubemqctl-create-basic.gif](./images/kubemqctl-create-basic.gif)

