---
title: Stream
lang: en-US
description: 'Kubemqctl queues stream command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Stream Command

Stream a message from a queue command

### Synopsis

Stream command allows to receive message from a queue in push mode response an appropriate action

```
kubemqctl queues stream [flags]
```

### Examples

```

	# Stream 'queues' message in transaction mode
	kubemqctl queue stream q1

	# Stream 'queues' message in transaction mode with visibility set to 120 seconds and wait time of 180 seconds
	kubemqctl queue stream q1 -v 120 -w 180

```

### Options

```
  -h, --help             help for stream
  -v, --visibility int   set initial visibility seconds (default 30)
  -w, --wait int         set how many seconds to wait for 'queues' messages (default 60)
```


### SEE ALSO

* [kubemqctl queues ack](kubemqctl_queues_ack.md)	 - Ack all messages in a 'queues' channel
* [kubemqctl queues attach](kubemqctl_queues_attach.md)	 - Attach to 'queues' channels command
* [kubemqctl queues list](kubemqctl_queues_list.md)	 - Get a list of 'queues' channels / clients command
* [kubemqctl queues peek](kubemqctl_queues_peek.md)	 - Peek a messages from a queue channel command
* [kubemqctl queues receive](kubemqctl_queues_receive.md)	 - Receive a messages from a queue channel command
* [kubemqctl queues send](kubemqctl_queues_send.md)	 - Send a message to a queue channel command
* [kubemqctl queues stream](kubemqctl_queues_stream.md)	 - Stream a message from a queue command


