---
title: KubeTools (KubeMQ CLI)
lang: en-US
---
# KubeTools
Kubetools is a CLI application for testing KubeMQ server or cluster installation. In addition, Kubetools provides several utilities such as monitoring channel traffic, send messages, and subscribe to channels.
## Table of Content
[[toc]]
## Download / Installation
KubeTools executable can be downloaded from bin folder for 4 operating systems:
1. Windows 64bit
2. Mac OS 64bit
3. Linux 64bit
4. Linux 32bit

## Usage
Run :

``` bash
./kubetools
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

## Test
Run the following command for running various tests, checking of KubeMQ installation and proper configuration.
Run :

``` bash
./kubetools test
```
Or,

``` bash
./kubetools t
```


## Monitor
Run the following command to enter into a monitoring channels mode.


``` bash
./kubetools mon
```
Or,

``` bash
./kubetools m
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

:::: tabs type:card stretch:true

::: tab Queue lazy
Run the following command will monitor and show all traffic in `channel-name` Queue channel:

``` bash
./kubetools mon queue channel-name
```
Or,

``` bash
./kubetools m qu channel-name
```

:::

::: tab Events lazy
Run the following command will monitor and show all traffic in `channel-name` Pub/Sub Events channel:

``` bash
./kubetools mon events channel-name
```
Or,

``` bash
./kubetools m e channel-name
```

:::

::: tab Events-Store lazy
Run following command will monitor and show all traffic in `channel-name` Events Store channel:

``` bash
./kubetools mon events_store channel-name
```
Or,

``` bash
./kubetools m es channel-name
```

:::

::: tab Command lazy
Run the following command will monitor and show all traffic in `channel-name` Commands channel:


``` bash
./kubetools mon commands channel-name
```
Or,

``` bash
./kubetools m c channel-name
```
:::

::: tab Query lazy
Run the following command will monitor and show all traffic in `channel-name` Queries channel:

``` bash
./kubetools mon queries channel-name
```
Or,

``` bash
./kubetools m q channel-name
```
:::
::::


## Queue
Run the following command for sending and receiving queue messages.


``` bash
./kubetools queue

```
Or,

``` bash
./kubetools q
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


Choose one of the following Queue commands options:

:::: tabs type:card stretch:true

::: tab Send lazy

Run the following command for sending `your-message` to Queue channel `channel-name`:

``` bash
./kubetools queue send channel-name your-message 

```
Or,

``` bash
./kubetools q s
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
:::


::: tab Receive lazy

Run the following command for receiving queue message from `channel-name` and send an acknowledge back to the sender:


``` bash
./kubetools queue receive channel-name
```
Or,

``` bash
./kubetools q r channel-name
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

:::

::: tab Peak lazy
Run the following command for peaking messages in Queue channel `channel-name`:

``` bash
./kubetools queue peak channel-name
```
Or,

``` bash
./kubetools q p channel-name
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


:::

::: tab Ack-All lazy
Run the following command for ack all queue messages in Queue `channel-name`:


``` bash
./kubetools queue ack channel-name
```
Or,

``` bash
./kubetools q a channel-name
```

:::
::::




## Pub/Sub
Run the following command for publish and subscribe real-time and persistent events:


``` bash
./kubetools pubsub
```
Or,

``` bash
./kubetools p
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

:::: tabs type:card stretch:true

::: tab Send-Event lazy

Run the following command for sending `your-message` to Events channel `channel-name`:

``` bash
./kubetools pubsub send events channel-name your-message
```
Or,

``` bash
./kubetools p s e channel-name your-message
```

:::


::: tab Receive-Events lazy

Run the following command for receiving messages in Events channel `channel-name`:


``` bash
./kubetools pubsub receive events channel-name
```
Or,

``` bash
./kubetools p r e channel-name your-message
```


:::

::: tab Send-Events-Store lazy
Run the following command for sending messages in Events Store channel `channel-name`:

``` bash
./kubetools pubsub send events_store channel-name your-message
```
Or,

``` bash
./kubetools p s es channel-name your-message
```

:::

::: tab Receive-Events-Store lazy
Run the following command for receiving messages in Events Store channel `channel-name`:


``` bash
./kubetools pubsub receive events_store channel-name
```
Or,

``` bash
./kubetools p r es channel-name your-message
```

:::
::::


## RPC

Run the following command for for sending and receiving RPC calls of commands and queries:


``` bash
./kubetools rpc
```
Or,

``` bash
./kubetools r
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

:::: tabs type:card stretch:true

::: tab Send-Command lazy

Run the following command for sending `your-message` to Commands channel `channel-name`:

``` bash
./kubetools rpc send command channel-name your-message
```
Or,

``` bash
./kubetools r s c channel-name your-message
```

:::


::: tab Receive-Commands lazy

Run the following command for receiving messages in Command channel `channel-name` and send an acknowledge back to the sender:


``` bash
./kubetools rpc receive command channel-name
```
Or,

``` bash
./kubetools r r c channel-name your-message
```


:::

::: tab Send-Query lazy
Run the following command for sending `your-message` to Query channel `channel-name`:

``` bash
./kubetools rpc send query channel-name your-message
```
Or,

``` bash
./kubetools r s q channel-name your-message
```

:::

::: tab Receive-Query lazy
Run the following command for receiving messages in Query channel `channel-name` and send an acknowledge back to the sender:

``` bash
./kubetools rpc receive query channel-name

```
Or,

``` bash
./kubetools r r q channel-name your-message
```

:::
::::


## Health

Run the following command for checking health monitor point of KubeMQ:

``` bash
./kubetools health
```
Or,

``` bash
./kubetools h
```

## Metrics
Run the following command for receiving metrics data of KubeMQ:


``` bash
./kubetools metrics
```
Or,

``` bash
./kubetools m
```


## Configuration
KubeTools require `.config.yaml` File for connections variables. Default configuration:

``` yaml
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