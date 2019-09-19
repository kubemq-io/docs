---
title: Send
lang: en-US
description: 'Kubemqctl queues send command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Send Command

Send a message to a queue channel command

### Synopsis

Send command allows to send one or many message to a queue channel

```
kubemqctl queues send [flags]
```

### Examples

```

	# Send message to a queue channel channel
	kubemqctl queue send q1 some-message
	
	# Send message to a queue channel with metadata
	kubemqctl queue send q1 some-message --metadata some-metadata
	
	# Send 5 messages to a queues channel with metadata
	kubemqctl queue send q1 some-message --metadata some-metadata -m 5
	
	# Send message to a queue channel with a message expiration of 5 seconds
	kubemqctl queue send q1 some-message -e 5

	# Send message to a queue channel with a message delay of 5 seconds
	kubemqctl queue send q1 some-message -d 5

	# Send message to a queue channel with a message policy of max receive 5 times and dead-letter queue 'dead-letter'
	kubemqctl queue send q1 some-message -r 5 -q dead-letter

```

### Options

```
  -q, --dead-letter-queue string   set dead-letter queue name
  -d, --delay int                  set queue message sending delay seconds
  -e, --expiration int             set queue message expiration seconds
  -h, --help                       help for send
  -r, --max-receive int            set dead-letter max receive count
  -m, --messages int               set dead-letter max receive count (default 1)
      --metadata string            set queue message metadata field
```
### SEE ALSO

* [kubemqctl queues ack](kubemqctl_queues_ack.md)	 - Ack all messages in a 'queues' channel
* [kubemqctl queues attach](kubemqctl_queues_attach.md)	 - Attach to 'queues' channels command
* [kubemqctl queues list](kubemqctl_queues_list.md)	 - Get a list of 'queues' channels / clients command
* [kubemqctl queues peek](kubemqctl_queues_peek.md)	 - Peek a messages from a queue channel command
* [kubemqctl queues receive](kubemqctl_queues_receive.md)	 - Receive a messages from a queue channel command
* [kubemqctl queues send](kubemqctl_queues_send.md)	 - Send a message to a queue channel command
* [kubemqctl queues stream](kubemqctl_queues_stream.md)	 - Stream a message from a queue command

