---
title: Receive
lang: en-US
description: 'Kubemqctl queues receive command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Receive Command

Receive a messages from a queue channel command

### Synopsis

Receive command allows to receive one or many messages from a queue channel

```
kubemqctl queues receive [flags]
```

### Examples

```

	# Receive 1 messages from a queue channel q1 and wait for 2 seconds (default)
	kubemqctl queue receive q1

	# Receive 3 messages from a queue channel and wait for 5 seconds
	kubemqctl queue receive q1 -m 3 -t 5

	# Watching 'queues' channel messages
	kubemqctl queue receive q1 -w

```

### Options

```
  -h, --help               help for receive
  -m, --messages int       set how many messages we want to get from a queue (default 1)
  -t, --wait-timeout int   set how many seconds to wait for 'queues' messages (default 2)
  -w, --watch              set watch on 'queues' channel
```
### SEE ALSO

* [kubemqctl queues ack](kubemqctl_queues_ack.md)	 - Ack all messages in a 'queues' channel
* [kubemqctl queues attach](kubemqctl_queues_attach.md)	 - Attach to 'queues' channels command
* [kubemqctl queues list](kubemqctl_queues_list.md)	 - Get a list of 'queues' channels / clients command
* [kubemqctl queues peek](kubemqctl_queues_peek.md)	 - Peek a messages from a queue channel command
* [kubemqctl queues receive](kubemqctl_queues_receive.md)	 - Receive a messages from a queue channel command
* [kubemqctl queues send](kubemqctl_queues_send.md)	 - Send a message to a queue channel command
* [kubemqctl queues stream](kubemqctl_queues_stream.md)	 - Stream a message from a queue command

