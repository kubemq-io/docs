---
title: Attach
lang: en-US
description: 'kubemqctl queues attach command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Attach Command

Attach to 'queues' channels command

### Synopsis

Attach command allows to display 'queues' channel content for debugging proposes

```
kubemqctl queues attach [flags]
```

### Examples

```

	# Attach to all active 'queues' channels and output running messages
	kubemqctl queue attach all
	
	# Attach to some-queue queue channel and output running messages
	kubemqctl queue attach some-queue

	# Attach to some-queue1 and some-queue2 queue channels and output running messages
	kubemqctl queue attach some-queue1 some-queue2 

	# Attach to some-queue queue channel and output running messages filter by include regex (some*)
	kubemqctl queue attach some-queue -i some*

	# Attach to some-queue queue channel and output running messages filter by exclude regex (not-some*)
	kubemqctl queue attach some-queue -e not-some*

```

### Options

```
  -e, --exclude stringArray   set (regex) strings to exclude
  -h, --help                  help for attach
  -i, --include stringArray   aet (regex) strings to include
```
### SEE ALSO

* [kubemqctl queues ack](kubemqctl_queues_ack.md)	 - Ack all messages in a 'queues' channel
* [kubemqctl queues attach](kubemqctl_queues_attach.md)	 - Attach to 'queues' channels command
* [kubemqctl queues list](kubemqctl_queues_list.md)	 - Get a list of 'queues' channels / clients command
* [kubemqctl queues peek](kubemqctl_queues_peek.md)	 - Peek a messages from a queue channel command
* [kubemqctl queues receive](kubemqctl_queues_receive.md)	 - Receive a messages from a queue channel command
* [kubemqctl queues send](kubemqctl_queues_send.md)	 - Send a message to a queue channel command
* [kubemqctl queues stream](kubemqctl_queues_stream.md)	 - Stream a message from a queue command

