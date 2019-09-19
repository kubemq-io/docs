---
title: Ack
lang: en-US
description: 'kubemqctl queues ack command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Ack Command

Ack all messages in a 'queues' channel

### Synopsis

Ack command allows to clear / remove / ack all messages in a 'queues' channel

```
kubemqctl queues ack [flags]
```

### Examples

```

	# Ack all messages in a 'queues' channel 'some-channel' with 2 seconds of wait to complete operation
	kubemqctl queue ack some-channel
	
	# Ack all messages in a 'queues' channel 'some-long-queue' with 30 seconds of wait to complete operation
	kubemqctl queue ack some-long-queue -w 30

```

### Options

```
  -h, --help       help for ack
  -w, --wait int   set how many seconds to wait for ack all messages (default 2)
```

### SEE ALSO

* [kubemqctl queues ack](kubemqctl_queues_ack.md)	 - Ack all messages in a 'queues' channel
* [kubemqctl queues attach](kubemqctl_queues_attach.md)	 - Attach to 'queues' channels command
* [kubemqctl queues list](kubemqctl_queues_list.md)	 - Get a list of 'queues' channels / clients command
* [kubemqctl queues peek](kubemqctl_queues_peek.md)	 - Peek a messages from a queue channel command
* [kubemqctl queues receive](kubemqctl_queues_receive.md)	 - Receive a messages from a queue channel command
* [kubemqctl queues send](kubemqctl_queues_send.md)	 - Send a message to a queue channel command
* [kubemqctl queues stream](kubemqctl_queues_stream.md)	 - Stream a message from a queue command


