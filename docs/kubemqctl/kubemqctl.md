---
title: Get Started
lang: en-US
description: 'Kubemq get started'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

# Kubemqctl

Kubemqctl is a command line interface (CLI) for [KubeMQ](https://kubemq.io) [Kubernetes](https://kubernetes.io/) Message Broker.

```bash
Usage:
  kubemqctl [command]

Available Commands:
  cluster      Executes KubeMQ cluster management commands
  commands     Execute KubeMQ 'commands' RPC commands
  config       Run Kubemqctl configuration wizard command
  events       Execute KubeMQ 'events' Pub/Sub commands
  events_store Execute KubeMQ 'events_store' Pub/Sub commands
  help         Help about any command
  queries      Execute KubeMQ 'queries' RPC based commands
  queues       Execute KubeMQ 'queues' commands

Flags:
  -h, --help      help for kubemqctl
      --version   version for kubemqctl

Use "kubemqctl [command] --help" for more information about a command.

```
### Installation

<CodeSwitcher :languages="{macOS:'macOS',linux64:'Linux 64 Bits',linux32:'Linux 32 Bits',windows:'Windows'}" :isolated="true">

<template v-slot:macOS>

Copy and paste the following lines:

```bash
curl -L https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl_darwin_amd64 -o /usr/local/bin/kubemqctl 
chmod +x /usr/local/bin/kubemqctl

```

</template>


<template v-slot:linux64>

Copy and paste the following lines:

```bash
curl -L https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl_linux_amd64 -o /usr/local/bin/kubemqctl
chmod +x /usr/local/bin/kubemqctl

```

</template>


<template v-slot:linux32>

Copy and paste the following lines:

```bash
curl -L https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl_linux_386 -o /usr/local/bin/kubemqctl
chmod +x /usr/local/bin/kubemqctl

```

</template>


<template v-slot:windows>

##### Option 1:

- [Download the latest kubemqctl.exe](https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl.exe).
- Place the file under e.g. `C:\Program Files\Kubemqctl\kubemqctl.exe`
- Add that directory to your system path to access it from any command prompt

##### Option 2:
Run in PowerShell as administrator:

```powershell
New-Item -ItemType Directory 'C:\Program Files\Kubemqctl'
Invoke-WebRequest https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl.exe -OutFile 'C:\Program Files\Kubemqctl\kubemqctl.exe'
[Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine) + ';C:\Program Files\Kubemqctl', [EnvironmentVariableTarget]::Machine)
$env:Path += ';C:\Program Files\Kubemqctl'
```

</template>

</CodeSwitcher>

### KubeMQ Token

Please visit [Register/Login](https://account.kubemq.io/login/register) to obtain KubeMQ token.

### Available Commands

#### Cluster

* [kubemqctl cluster create](./cluster/kubemqctl_cluster_create.md)	 - Create a KubeMQ cluster command
* [kubemqctl cluster apply](./cluster/kubemqctl_cluster_apply.md)	 - Apply a KubeMQ cluster command
* [kubemqctl cluster delete](./cluster/kubemqctl_cluster_delete.md)	 - Delete KubeMQ cluster command
* [kubemqctl cluster scale](./cluster/kubemqctl_cluster_scale.md)	 - Scale KubeMQ cluster replicas command
* [kubemqctl cluster get](./cluster/kubemqctl_cluster_get.md)	 - Get information of KubeMQ of clusters command
* [kubemqctl cluster describe](./cluster/kubemqctl_cluster_describe.md)	 - Describe KubeMQ cluster command
* [kubemqctl cluster logs](./cluster/kubemqctl_cluster_logs.md)	 - Stream logs of KubeMQ cluster pods command
* [kubemqctl cluster proxy](./cluster/kubemqctl_cluster_proxy.md)	 - Proxy KubeMQ cluster connection to localhost command
* [kubemqctl cluster events](./cluster/kubemqctl_cluster_events.md)	 - Show KubeMQ cluster events command
* [kubemqctl cluster context](./cluster/kubemqctl_cluster_context.md)	 - Select kubernetes cluster context command
* [kubemqctl cluster dashboard](./cluster/kubemqctl_cluster_dashboard.md)	 - Dashboard command allows to start a web view of KubeMQ cluster dashboard

#### Queues

* [kubemqctl queues send](./queues/kubemqctl_queues_send.md)	 - Send a message to a queue channel command
* [kubemqctl queues receive](./queues/kubemqctl_queues_receive.md)	 - Receive a messages from a queue channel command
* [kubemqctl queues stream](./queues/kubemqctl_queues_stream.md)	 - Stream a message from a queue command
* [kubemqctl queues peek](./queues/kubemqctl_queues_peek.md)	 - Peek a messages from a queue channel command
* [kubemqctl queues ack](./queues/kubemqctl_queues_ack.md)	 - Ack all messages in a 'queues' channel
* [kubemqctl queues list](./queues/kubemqctl_queues_list.md)	 - Get a list of 'queues' channels / clients command
* [kubemqctl queues attach](./queues/kubemqctl_queues_attach.md)	 - Attach to 'queues' channels command

#### Events

* [kubemqctl events send](./events/kubemqctl_events_send.md)	 - Send messages to an 'events' channel command
* [kubemqctl events receive](./events/kubemqctl_events_receive.md)	 - Receive a message from 'events' channel command
* [kubemqctl events attach](./events/kubemqctl_events_attach.md)	 - Attach to 'events' channels command

#### Events Store

* [kubemqctl events_store send](./events_store/kubemqctl_events_store_send.md)	 - Send messages to an 'events store' channel command
* [kubemqctl events_store receive](./events_store/kubemqctl_events_store_receive.md)	 - Receive a messages from an 'events store'
* [kubemqctl events_store attach](./events_store/kubemqctl_events_store_attach.md)	 - Attach to events store channels command
* [kubemqctl events_store list](./events_store/kubemqctl_events_store_list.md)	 - Get a list of 'events store' channels / clients command

#### Commands

* [kubemqctl commands send](./commands/kubemqctl_commands_send.md)	 - Send messages to 'commands' channel command
* [kubemqctl commands receive](./commands/kubemqctl_commands_receive.md)	 - Receive a message from 'commands' channel command
* [kubemqctl commands attach](./commands/kubemqctl_commands_attach.md)	 - Attach to 'commands' channels command

#### Queries

* [kubemqctl queries send](./queries/kubemqctl_queries_send.md)	 - Send messages to a 'queries' channel command
* [kubemqctl queries receive](./queries/kubemqctl_queries_receive.md)	 - Receive a message from a 'queries' channel
* [kubemqctl queries attach](./queries/kubemqctl_queries_attach.md)	 - Attach to 'queries' channels command

#### Config

* [kubemqctl config](./config/kubemqctl_config.md)	 - Run Kubemqctl configuration wizard command




