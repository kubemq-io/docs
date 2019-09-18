---
title: Kubemqctl
lang: en-US
description: 'KubeMQ Command Line Interface reference'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','cli']
---
# Kubemqctl
Kubemqctl provides access to [KubeMQ](https://kubemq.io) via a command-line interface.

It currently provides the ability to:

- **Test KubeMQ server installation** from the command line and verify proper configuration.
- **Execute Queue, Pub/Sub and RPC commands** message patterns.
- **Monitor Channels** and view messages.
- **Check Health** and get simple stats.
- **Get Metrics** detailed data

If there is something you'd like to see Kubemqctl be able to do from the CLI, let us know! :)

## Table of Content
[[toc]]

## Installation

### Mac OS:

```bash
curl -L https://github.com/kubemq-io/Kubemqctl/releases/download/latest/Kubemqctl_darwin_amd64 -o /usr/local/bin/Kubemqctl 
chmod +x /usr/local/bin/Kubemqctl
```

### Linux 64 bits:

```bash
curl -L https://github.com/kubemq-io/Kubemqctl/releases/download/latest/Kubemqctl_linux_amd64 -o /usr/local/bin/Kubemqctl
chmod +x /usr/local/bin/Kubemqctl
```


### Linux 32 bits:

```bash
curl -L https://github.com/kubemq-io/Kubemqctl/releases/download/latest/Kubemqctl_linux_386 -o /usr/local/bin/Kubemqctl
chmod +x /usr/local/bin/Kubemqctl
```

### Windows:

Run in PowerShell as administrator:

```powershell
New-Item -ItemType Directory 'C:\Program Files\Kubemqctl'
Invoke-WebRequest https://github.com/kubemq-io/Kubemqctl/releases/download/latest/Kubemqctl.exe -OutFile 'C:\Program Files\Kubemqctl\Kubemqctl.exe'
[Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine) + ';C:\Program Files\Kubemqctl', [EnvironmentVariableTarget]::Machine)
$env:Path += ';C:\Program Files\Kubemqctl'
```

Or manually:

- [Download the latest Kubemqctl.exe](https://github.com/sourcegraph/src-cli/releases/download/latest/kubetolls.exe).
- Place the file under e.g. `C:\Program Files\Kubemqctl\Kubemqctl.exe`
- Add that directory to your system path to access it from any command prompt


## Configuration
Kubemqctl require `.config.yaml` File for connections variables. Default configuration:

```
statsAddress: "http://localhost:8080/v1/stats" #the address of Stats endpoint, you can replace the localhost:8080 with your address
healthAddress: "http://localhost:8080/health" # the address of Health endpoint , you can replace the localhost:8080 with your address
metricsAddress: "http://localhost:8080/metrics" #the address of Health endpoint, you can replace the localhost:8080 with your address
monitorAddress: "ws://localhost:8080/v1/stats" #the address of Monitor endpoint, you can replace the localhost:8080 with your address
connections:
  - kind: 1 # 1 - grpc 2- rest
    host: "localhost" # host destination
    port: 50000 # port destination
    isSecured: false # set using https
    certFile: "" # set location of cert file
  - kind: 2 # 1 - grpc 2- rest
    host: "localhost" # host destination
    port: 9090  # port destination
    isSecured: false  # set using https
    certFile: "" # set location of cert file - not in use for Rest

```

## Usage
Run :

``` bash
Kubemqctl
```
Will prompt the following:

```
Usage:
  Kubemqctl [command]

Available Commands:
  get         Call kubemq get resources endpoint
  health      Call kubemq health endpoint
  help        Help about any command
  metrics     Call kubemq metrics endpoint
  mon         monitor messages/requests channels
  pubsub      send and receive pub/sub real-time and persistent events
  queue       send and receive queue messages
  rpc         send and receive rpc commands and queries
  test        test your kubemq installation
  version     print kubemq version

Flags:
  -h, --help   help for Kubemqctl

Use "Kubemqctl [command] --help" for more information about a command.

```
## Get Command <Badge text="v1.3.0+"/> <Badge text="requires KubeMQ v1.6.0+" type="warn"/>
Run the following command for retrieve an information about various resources such Queues and Events Stores

Run :

``` bash
Kubemqctl get
```
Or,

``` bash
Kubemqctl g
```

A list of sub commands will be shown:

``` bash
Usage:
  Kubemqctl get [command]

Aliases:
  get, g

Available Commands:
  events_stores Call kubemq get list of events store channels
  queues        Call kubemq get list of queues

Flags:
  -h, --help   help for get

Use "Kubemqctl get [command] --help" for more information about a command.

```
::: warning
This features is supported only for KubeMQ version v1.6.2 and up
:::

Choose one of the following Get options:

<CodeSwitcher :languages="{queue:'Queues',events_store:`Events Stores`}" :isolated="true">


<template v-slot:queue>

``` bash
Kubemqctl get queues
```
Or,

``` bash
Kubemqctl g qu
```

Example of results:

```
CHANNELS:
NAME       CLIENTS  MESSAGES  BYTES   FIRST_SEQUENCE  LAST_SEQUENCE
dead       1        0         0       0               0
done       1        3000      563231  1               3000
receiverA  1        3000      593231  1               3000
receiverB  1        3000      593231  1               3000
receiverC  1        3000      593231  1               3000
receiverD  1        3000      593231  1               3000
receiver   1        3000      593231  1               3000
receiverF  1        3000      593231  1               3000

TOTAL CHANNELS:  8

CLIENTS:
CLIENT_ID                             CHANNEL    ACTIVE  LAST_SENT  PENDING  STALLED
49e2f897-8051-49cb-98af-8949a8ce9093  dead       false   0          0        false
ff897393-bbb6-4877-a7ed-4130b752ae33  done       false   3000       0        false
056b501a-1f5f-4722-875f-859c36e0997a  receiverA  false   3000       0        false
d44d7fb2-f21e-46aa-96db-e475c8bf0848  receiverB  false   3000       0        false
4a9fab08-4cd7-4e75-984c-f94b9759209e  receiverC  false   3000       0        false
06f44b57-afa5-46d9-88d0-4b5ce0516129  receiverD  false   3000       0        false
06bbe283-1978-4751-8abc-5699dacea741  receiver   false   3000       0        false
475d17c0-847c-4969-9c05-bf171f176f86  receiverF  false   3000       0        false

TOTAL CLIENTS:  8
```


</template>
<template v-slot:events_store>

Run the following command for retrieve an information about Events Stores

``` bash
Kubemqctl get events_stores
```
Or,

``` bash
Kubemqctl g es
```

Results example are similar to Get Queues results.

</template>
</CodeSwitcher>

## Test Command
Run the following command for running various tests, checking of KubeMQ installation and proper configuration.
Run :

``` bash
Kubemqctl test
```
Or,

``` bash
Kubemqctl t
```


## Monitor Command
Run the following command to enter into a monitoring channels mode.


``` bash
Kubemqctl mon
```
Or,

``` bash
Kubemqctl m
```

Available sub commands:

```
Usage:
  Kubemqctl mon [command]

Aliases:
  mon, m

Available Commands:
  commands     monitor commands channels
  events       monitor events channels
  events_store monitor events store channels
  queries      monitor query channels
  queue        monitor queue channels

Flags:
  -h, --help   help for mon

Use "Kubemqctl mon [command] --help" for more information about a command.
```

Choose one of the following Monitoring options:


<CodeSwitcher :languages="{queue:'Queue',events:'Events',events_store:`Events Store`,commands:'Commands',queries:'Queries'}" :isolated="true">


<template v-slot:queue>

### Queue
Run the following command will monitor and show all traffic in `channel-name` Queue channel:

``` bash
Kubemqctl mon queue channel-name
```
Or,

``` bash
Kubemqctl m qu channel-name
```

</template>
<template v-slot:events>

### Events
Run the following command will monitor and show all traffic in `channel-name` Pub/Sub Events channel:

``` bash
Kubemqctl mon events channel-name
```
Or,

``` bash
Kubemqctl m e channel-name
```

</template>
<template v-slot:events_store>

### Events Store

Run following command will monitor and show all traffic in `channel-name` Events Store channel:

``` bash
Kubemqctl mon events_store channel-name
```
Or,

``` bash
Kubemqctl m es channel-name
```

</template>
<template v-slot:commands>

### Commands
Run the following command will monitor and show all traffic in `channel-name` Commands channel:

``` bash
Kubemqctl mon commands channel-name
```
Or,

``` bash
Kubemqctl m c channel-name
```
</template>
<template v-slot:queries>

### Queries
Run the following command will monitor and show all traffic in `channel-name` Queries channel:

``` bash
Kubemqctl mon queries channel-name
```
Or,

``` bash
Kubemqctl m q channel-name
```
</template>
</CodeSwitcher>

## Queue Command
Run the following command for sending and receiving queue messages.


``` bash
Kubemqctl queue

```
Or,

``` bash
Kubemqctl q
```

Available Queue commands:

```
Usage:
  Kubemqctl queue [command]

Aliases:
  queue, q

Available Commands:
  ack         acl all messages in a queue
  peak        peak messages from a queue
  receive     receive messages from a queue
  send        send message to a queue

Flags:
  -h, --help                    help for queue
  -t, --queueTransport string   set transport type, grpc or rest (default "grpc")

Use "Kubemqctl queue [command] --help" for more information about a command.
```


<CodeSwitcher :languages="{send:'Send',receive:'Receive',peak:`Peak`,ack_all:'Ack All'}" :isolated="true">


<template v-slot:send>

### Send
Run the following command for sending `your-message` to Queue channel `channel-name`:

``` bash
Kubemqctl queue send channel-name your-message 

```
Or,

``` bash
Kubemqctl q s
```

Available flags:
```
Usage:
  Kubemqctl queue send [flags]

Aliases:
  send, s

Flags:
  -h, --help                 help for send
  -d, --sendDelay int        set queue message send delay seconds
  -e, --sendExpiration int   set queue message expiration seconds

Global Flags:
  -t, --queueTransport string   set transport type, grpc or rest (default "grpc")
```

</template>
<template v-slot:receive>

### Receive


Run the following command for receiving queue message from `channel-name` and send an acknowledge back to the sender:


``` bash
Kubemqctl queue receive channel-name
```
Or,

``` bash
Kubemqctl q r channel-name
```

Available flags:

```
Usage:
  Kubemqctl queue receive [flags]

Aliases:
  receive, r

Flags:
  -h, --help                  help for receive
  -i, --receiveMessages int   set how many messages we want to get from queue (default 1)
  -w, --receiveWait int       set how many seconds to wait for queue messages (default 2)

Global Flags:
  -t, --queueTransport string   set transport type, grpc or rest (default "grpc")

```

</template>
<template v-slot:peak>

### Peak
Run the following command for peaking messages in Queue channel `channel-name`:

``` bash
Kubemqctl queue peak channel-name
```
Or,

``` bash
Kubemqctl q p channel-name
```
Available flags:


```
Usage:
  Kubemqctl queue peak [flags]

Aliases:
  peak, p

Flags:
  -h, --help                  help for peak
  -i, --receiveMessages int   set how many messages we peak to get from queue (default 1)
  -w, --receiveWait int       set how many seconds to peak for queue messages (default 2)

Global Flags:
  -t, --queueTransport string   set transport type, grpc or rest (default "grpc")
```


</template>
<template v-slot:ack_all>

### Ack All
Run the following command for ack all queue messages in Queue `channel-name`:

``` bash
Kubemqctl queue ack channel-name
```
Or,

``` bash
Kubemqctl q a channel-name
```


</template>
</CodeSwitcher>

## Pub/Sub Command
Run the following command for publish and subscribe real-time and persistent events:


``` bash
Kubemqctl pubsub
```
Or,

``` bash
Kubemqctl p
```

Available Pub/Sub commands:

```
Usage:
  Kubemqctl pubsub [command]

Aliases:
  pubsub, p, ps

Available Commands:
  receive     receive pub/sub real-time and persistent events
  send        send pub/sub real-time and persistent events

Flags:
  -h, --help                     help for pubsub
  -t, --pubsubTransport string   set transport type, grpc or rest (default "grpc")

Use "Kubemqctl pubsub [command] --help" for more information about a command.
```

Choose one of the following Pub/Sub commands options:

<CodeSwitcher :languages="{send_event:'Send Event',receive_events:'Receive Events',send_event_store:`Send Event-Store`,receive_events_store:'Receive Events-Store'}" :isolated="true">

<template v-slot:send_event>

### Send Event

Run the following command for sending `your-message` to Events channel `channel-name`:

``` bash
Kubemqctl pubsub send events channel-name your-message
```
Or,

``` bash
Kubemqctl p s e channel-name your-message
```

</template>
<template v-slot:receive_events>

### Receive Event

Run the following command for receiving messages in Events channel `channel-name`:

``` bash
Kubemqctl pubsub receive events channel-name
```
Or,

``` bash
Kubemqctl p r e channel-name your-message
```

</template>

<template v-slot:send_event_store>

### Send Event-Store

Run the following command for sending messages in Events Store channel `channel-name`:

``` bash
Kubemqctl pubsub send events_store channel-name your-message
```
Or,

``` bash
Kubemqctl p s es channel-name your-message
```

</template>

<template v-slot:receive_events_store>

### Receive Events-Store

Run the following command for receiving messages in Events Store channel `channel-name`:

``` bash
Kubemqctl pubsub receive events_store channel-name
```
Or,

``` bash
Kubemqctl p r es channel-name your-message
```

</template>
</CodeSwitcher>


## RPC Command

Run the following command for for sending and receiving RPC calls of commands and queries:


``` bash
Kubemqctl rpc
```
Or,

``` bash
Kubemqctl r
```

Available RPC commands:

```
Usage:
  Kubemqctl rpc [command]

Aliases:
  rpc, r

Available Commands:
  receive     receive commands or queries
  send        send commands and queries

Flags:
  -h, --help                  help for rpc
  -t, --rpcTransport string   set transport type, grpc or rest (default "grpc")

Use "Kubemqctl rpc [command] --help" for more information about a command.
```


Choose one of the following RPC commands options:

<CodeSwitcher :languages="{send_command:'Send Command',receive_commands:'Receive Commands',send_query:'Send Query',receive_queries:'Receive Queries'}" :isolated="true">

<template v-slot:send_command>

### Send Command


Run the following command for sending `your-message` to Commands channel `channel-name`:

``` bash
Kubemqctl rpc send command channel-name your-message
```
Or,

``` bash
Kubemqctl r s c channel-name your-message
```

</template>
<template v-slot:receive_commands>

### Receive Commands

Run the following command for receiving messages in Command channel `channel-name` and send an acknowledge back to the sender:

``` bash
Kubemqctl rpc receive command channel-name
```
Or,

``` bash
Kubemqctl r r c channel-name your-message
```

</template>

<template v-slot:send_query>

### Send Query

Run the following command for sending `your-message` to Query channel `channel-name`:

``` bash
Kubemqctl rpc send query channel-name your-message
```
Or,

``` bash
Kubemqctl r s q channel-name your-message
```

</template>

<template v-slot:receive_queries>

### Receive Queries

Run the following command for receiving messages in Query channel `channel-name` and send an acknowledge back to the sender:

``` bash
Kubemqctl rpc receive query channel-name

```
Or,

``` bash
Kubemqctl r r q channel-name your-message
```

</template>
</CodeSwitcher>


## Health Command

Run the following command for checking health monitor point of KubeMQ:

``` bash
Kubemqctl health
```
Or,

``` bash
Kubemqctl h
```

## Metrics Command
Run the following command for receiving metrics data of KubeMQ:


``` bash
Kubemqctl metrics
```
Or,

``` bash
Kubemqctl m
```

