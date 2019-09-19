---
title: List
lang: en-US
description: 'Kubemqctl queues list command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### List Command

Get a list of 'queues' channels / clients command

### Synopsis

List command allows to get a list of 'queues' channels / clients with details

```
kubemqctl queues list [flags]
```

### Examples

```

	# Get a list of queues / clients
	kubemqctl queue list
	
	# Get a list of queues / clients filtered by 'some-queue' channel only
	kubemqctl queue list -f some-queue

```

### Options

```
  -f, --filter string   set filter for channel / client name
  -h, --help            help for list
```
### SEE ALSO

* [kubemqctl queues ack](kubemqctl_queues_ack.md)	 - Ack all messages in a 'queues' channel
* [kubemqctl queues attach](kubemqctl_queues_attach.md)	 - Attach to 'queues' channels command
* [kubemqctl queues list](kubemqctl_queues_list.md)	 - Get a list of 'queues' channels / clients command
* [kubemqctl queues peek](kubemqctl_queues_peek.md)	 - Peek a messages from a queue channel command
* [kubemqctl queues receive](kubemqctl_queues_receive.md)	 - Receive a messages from a queue channel command
* [kubemqctl queues send](kubemqctl_queues_send.md)	 - Send a message to a queue channel command
* [kubemqctl queues stream](kubemqctl_queues_stream.md)	 - Stream a message from a queue command
