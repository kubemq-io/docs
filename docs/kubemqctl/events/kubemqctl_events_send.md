---
title: Send
lang: en-US
description: 'kubemqctl events send command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Send Command

Send messages to an 'events' channel command

### Synopsis

Send command allows to send (publish) one or many messages to an 'events' channel

```
kubemqctl events send [flags]
```

### Examples

```

	# Send (Publish) message to a 'events' channel
	kubemqctl events send some-channel some-message
	
	# Send (Publish) message to a 'events' channel with metadata
	kubemqctl events send some-channel some-message --metadata some-metadata
	
	# Send (Publish) batch of 10 messages to a 'events' channel
	kubemqctl events send some-channel some-message -m 10

```

### Options

```
  -h, --help              help for send
  -m, --messages int      set how many 'events' messages to send (default 1)
      --metadata string   set message metadata field
```

### SEE ALSO

* [kubemqctl events attach](kubemqctl_events_attach.md)	 - Attach to 'events' channels command
* [kubemqctl events receive](kubemqctl_events_receive.md)	 - Receive a message from 'events' channel command
* [kubemqctl events send](kubemqctl_events_send.md)	 - Send messages to an 'events' channel command

