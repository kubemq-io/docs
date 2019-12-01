---
title: Peek
lang: en-US
description: 'Kubemqctl queues peek command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Peek Command

Peek a messages from a queue channel command

### Synopsis

Peek command allows to peek one or many messages from a queue channel without removing them from the queue

```
kubemqctl queues peek [flags]
```

### Examples

```

	# Peek 1 messages from a queue and wait for 2 seconds (default)
	kubemqctl queue peek some-channel

	# Peek 3 messages from a queue and wait for 5 seconds
	kubemqctl queue peek some-channel -m 3 -w 5

```

### Options

```
  -h, --help           help for peek
  -m, --messages int   set how many messages we want to peek from queue (default 1)
  -w, --wait int       set how many seconds to wait for peeking queue messages (default 2)
```
### SEE ALSO

* [kubemqctl queues ack](kubemqctl_queues_ack.md)	 - Ack all messages in a 'queues' channel
* [kubemqctl queues attach](kubemqctl_queues_attach.md)	 - Attach to 'queues' channels command
* [kubemqctl queues list](kubemqctl_queues_list.md)	 - Get a list of 'queues' channels / clients command
* [kubemqctl queues peek](kubemqctl_queues_peek.md)	 - Peek a messages from a queue channel command
* [kubemqctl queues receive](kubemqctl_queues_receive.md)	 - Receive a messages from a queue channel command
* [kubemqctl queues send](kubemqctl_queues_send.md)	 - Send a message to a queue channel command
* [kubemqctl queues stream](kubemqctl_queues_stream.md)	 - Stream a message from a queue command
