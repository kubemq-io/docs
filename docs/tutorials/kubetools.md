---
title: Kubetools
lang: en-US
description: 'KubeMQ Command Line Interface reference'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','cli']
---
# Kubetools
Kubetools provides access to [KubeMQ](https://kubemq.io) via a command-line interface.

It currently provides the ability to:

- **Test KubeMQ server installation** from the command line and verify proper configuration.
- **Execute Queue, Pub/Sub and RPC commands** message patterns.
- **Monitor Channels** and view messages.
- **Check Health** and get simple stats.
- **Get Metrics** detailed data

If there is something you'd like to see Kubetools be able to do from the CLI, let us know! :)

## Table of Content
[[toc]]

## Installation

### Mac OS:

```bash
curl -L https://github.com/kubemq-io/kubetools/releases/download/latest/kubetools_darwin_amd64 -o /usr/local/bin/kubetools 
chmod +x /usr/local/bin/kubetools
```

### Linux 64 bits:

```bash
curl -L https://github.com/kubemq-io/kubetools/releases/download/latest/kubetools_linux_amd64 -o /usr/local/bin/kubetools
chmod +x /usr/local/bin/kubetools
```


### Linux 32 bits:

```bash
curl -L https://github.com/kubemq-io/kubetools/releases/download/latest/kubetools_linux_386 -o /usr/local/bin/kubetools
chmod +x /usr/local/bin/kubetools
```

### Windows:

Run in PowerShell as administrator:

```powershell
New-Item -ItemType Directory 'C:\Program Files\Kubetools'
Invoke-WebRequest https://github.com/kubemq-io/kubetools/releases/download/latest/kubetools.exe -OutFile 'C:\Program Files\Kubetools\kubetools.exe'
[Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine) + ';C:\Program Files\Kubetools', [EnvironmentVariableTarget]::Machine)
$env:Path += ';C:\Program Files\Kubetools'
```

Or manually:

- [Download the latest kubetools.exe](https://github.com/sourcegraph/src-cli/releases/download/latest/kubetolls.exe).
- Place the file under e.g. `C:\Program Files\Kubetools\kubetools.exe`
- Add that directory to your system path to access it from any command prompt


## Configuration
Kubetools require `.config.yaml` File for connections variables. Default configuration:

```
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
kubetools
```
Will prompt the following:

```
Usage:
  kubetools [command]

Available Commands:
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
  -h, --help   help for kubetools

Use "kubetools [command] --help" for more information about a command.

```

## Test Command
Run the following command for running various tests, checking of KubeMQ installation and proper configuration.
Run :

``` bash
kubetools test
```
Or,

``` bash
kubetools t
```


## Monitor Command
Run the following command to enter into a monitoring channels mode.


``` bash
kubetools mon
```
Or,

``` bash
kubetools m
```

Available sub commands:

```
Usage:
  kubetools mon [command]

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

Use "kubetools mon [command] --help" for more information about a command.
```

Choose one of the following Monitoring options:


<CodeSwitcher :languages="{queue:'Queue',events:'Events',events_store:`Events Store`,commands:'Commands',queries:'Queries'}" :isolated="true">


<template v-slot:queue>

### Queue
Run the following command will monitor and show all traffic in `channel-name` Queue channel:

``` bash
kubetools mon queue channel-name
```
Or,

``` bash
kubetools m qu channel-name
```

</template>
<template v-slot:events>

### Events
Run the following command will monitor and show all traffic in `channel-name` Pub/Sub Events channel:

``` bash
kubetools mon events channel-name
```
Or,

``` bash
kubetools m e channel-name
```

</template>
<template v-slot:events_store>

### Events Store

Run following command will monitor and show all traffic in `channel-name` Events Store channel:

``` bash
kubetools mon events_store channel-name
```
Or,

``` bash
kubetools m es channel-name
```

</template>
<template v-slot:commands>

### Commands
Run the following command will monitor and show all traffic in `channel-name` Commands channel:

``` bash
kubetools mon commands channel-name
```
Or,

``` bash
kubetools m c channel-name
```
</template>
<template v-slot:queries>

### Queries
Run the following command will monitor and show all traffic in `channel-name` Queries channel:

``` bash
kubetools mon queries channel-name
```
Or,

``` bash
kubetools m q channel-name
```
</template>
</CodeSwitcher>

## Queue Command
Run the following command for sending and receiving queue messages.


``` bash
kubetools queue

```
Or,

``` bash
kubetools q
```

Available Queue commands:

```
Usage:
  kubetools queue [command]

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

Use "kubetools queue [command] --help" for more information about a command.
```


<CodeSwitcher :languages="{send:'Send',receive:'Receive',peak:`Peak`,ack_all:'Ack All'}" :isolated="true">


<template v-slot:send>

### Send
Run the following command for sending `your-message` to Queue channel `channel-name`:

``` bash
kubetools queue send channel-name your-message 

```
Or,

``` bash
kubetools q s
```

Available flags:
```
Usage:
  kubetools queue send [flags]

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
kubetools queue receive channel-name
```
Or,

``` bash
kubetools q r channel-name
```

Available flags:

```
Usage:
  kubetools queue receive [flags]

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
kubetools queue peak channel-name
```
Or,

``` bash
kubetools q p channel-name
```
Available flags:


```
Usage:
  kubetools queue peak [flags]

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
kubetools queue ack channel-name
```
Or,

``` bash
kubetools q a channel-name
```


</template>
</CodeSwitcher>

## Pub/Sub Command
Run the following command for publish and subscribe real-time and persistent events:


``` bash
kubetools pubsub
```
Or,

``` bash
kubetools p
```

Available Pub/Sub commands:

```
Usage:
  kubetools pubsub [command]

Aliases:
  pubsub, p, ps

Available Commands:
  receive     receive pub/sub real-time and persistent events
  send        send pub/sub real-time and persistent events

Flags:
  -h, --help                     help for pubsub
  -t, --pubsubTransport string   set transport type, grpc or rest (default "grpc")

Use "kubetools pubsub [command] --help" for more information about a command.
```

Choose one of the following Pub/Sub commands options:

<CodeSwitcher :languages="{send_event:'Send Event',receive_events:'Receive Events',send_event_store:`Send Event-Store`,receive_events_store:'Receive Events-Store'}" :isolated="true">

<template v-slot:send_event>

### Send Event

Run the following command for sending `your-message` to Events channel `channel-name`:

``` bash
kubetools pubsub send events channel-name your-message
```
Or,

``` bash
kubetools p s e channel-name your-message
```

</template>
<template v-slot:receive_events>

### Receive Event

Run the following command for receiving messages in Events channel `channel-name`:

``` bash
kubetools pubsub receive events channel-name
```
Or,

``` bash
kubetools p r e channel-name your-message
```

</template>

<template v-slot:send_event_store>

### Send Event-Store

Run the following command for sending messages in Events Store channel `channel-name`:

``` bash
kubetools pubsub send events_store channel-name your-message
```
Or,

``` bash
kubetools p s es channel-name your-message
```

</template>

<template v-slot:receive_events_store>

### Receive Events-Store

Run the following command for receiving messages in Events Store channel `channel-name`:

``` bash
kubetools pubsub receive events_store channel-name
```
Or,

``` bash
kubetools p r es channel-name your-message
```

</template>
</CodeSwitcher>


## RPC Command

Run the following command for for sending and receiving RPC calls of commands and queries:


``` bash
kubetools rpc
```
Or,

``` bash
kubetools r
```

Available RPC commands:

```
Usage:
  kubetools rpc [command]

Aliases:
  rpc, r

Available Commands:
  receive     receive commands or queries
  send        send commands and queries

Flags:
  -h, --help                  help for rpc
  -t, --rpcTransport string   set transport type, grpc or rest (default "grpc")

Use "kubetools rpc [command] --help" for more information about a command.
```


Choose one of the following RPC commands options:

<CodeSwitcher :languages="{send_command:'Send Command',receive_commands:'Receive Commands',send_query:'Send Query',receive_queries:'Receive Queries'}" :isolated="true">

<template v-slot:send_command>

### Send Command


Run the following command for sending `your-message` to Commands channel `channel-name`:

``` bash
kubetools rpc send command channel-name your-message
```
Or,

``` bash
kubetools r s c channel-name your-message
```

</template>
<template v-slot:receive_commands>

### Receive Commands

Run the following command for receiving messages in Command channel `channel-name` and send an acknowledge back to the sender:

``` bash
kubetools rpc receive command channel-name
```
Or,

``` bash
kubetools r r c channel-name your-message
```

</template>

<template v-slot:send_query>

### Send Query

Run the following command for sending `your-message` to Query channel `channel-name`:

``` bash
kubetools rpc send query channel-name your-message
```
Or,

``` bash
kubetools r s q channel-name your-message
```

</template>

<template v-slot:receive_queries>

### Receive Queries

Run the following command for receiving messages in Query channel `channel-name` and send an acknowledge back to the sender:

``` bash
kubetools rpc receive query channel-name

```
Or,

``` bash
kubetools r r q channel-name your-message
```

</template>
</CodeSwitcher>


## Health Command

Run the following command for checking health monitor point of KubeMQ:

``` bash
kubetools health
```
Or,

``` bash
kubetools h
```

## Metrics Command
Run the following command for receiving metrics data of KubeMQ:


``` bash
kubetools metrics
```
Or,

``` bash
kubetools m
```

