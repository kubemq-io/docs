---
title: 'Quick Start'
lang: en-US
type: 'article'
description: 'Get started with KubeMQ'
tags: ['pub/sub','message broker','KubeMQ']
---

# KubeMQ Quick Start
This QuickStart will guide you through running KubeMQ Message Broker cluster in Kubernetes, send and receive messages under 60 seconds.


## Step 1 - Get KubeMQ CLI - kubemqctl

<CodeSwitcher :languages="{macOS:'macOS',linux64:'Linux 64 Bits',linux32:'Linux 32 Bits',windows:'Windows'}" :isolated="true">

<template v-slot:macOS>

Copy and paste the following lines:

```bash
sudo curl -L https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl_darwin_amd64 -o /usr/local/bin/kubemqctl 
sudo chmod +x /usr/local/bin/kubemqctl

```

</template>


<template v-slot:linux64>

Copy and paste the following lines:

```bash
sudo curl -L https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl_linux_amd64 -o /usr/local/bin/kubemqctl
sudo chmod +x /usr/local/bin/kubemqctl

```

</template>


<template v-slot:linux32>

Copy and paste the following lines:

```bash
sudo curl -L https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl_linux_386 -o /usr/local/bin/kubemqctl
sudo chmod +x /usr/local/bin/kubemqctl

```

</template>


<template v-slot:windows>

##### Option 1:

- [Download the latest kubemqctl.exe](https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl.exe).
- Place the file under e.g. `C:\Program Files\kubemqctl\kubemqctl.exe`
- Add that directory to your system path to access it from any command prompt

##### Option 2:
Run in PowerShell as administrator:

```powershell
New-Item -ItemType Directory 'C:\Program Files\kubemqctl'
Invoke-WebRequest https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl.exe -OutFile 'C:\Program Files\kubemqctl\kubemqctl.exe'
[Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine) + ';C:\Program Files\kubemqctl', [EnvironmentVariableTarget]::Machine)
$env:Path += ';C:\Program Files\kubemqctl'
```

</template>

</CodeSwitcher>


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

<iframe width="560" height="315" src="https://www.youtube.com/embed/G3WIxa7YfFI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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
