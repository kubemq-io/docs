---
title: Send
lang: en-US
description: 'kubemqctl events store send command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Send Command

Send messages to an 'events store' channel command

### Synopsis

Send command allows to send (publish) one or many messages to an 'events store' channel

```
kubemqctl events_store send [flags]
```

### Examples

```

	# Send (Publish) message to an 'events store' channel
	kubemqctl events_store send some-channel some-message
	
	# Send (Publish) message to an 'events store' channel with metadata
	kubemqctl events_store send some-channel some-message --metadata some-metadata

	# Send 10 messages to an 'events store' channel
	kubemqctl events_store send some-channel some-message -m 10

```

### Options

```
  -h, --help              help for send
  -m, --messages int      set how many 'events store' messages to send (default 1)
      --metadata string   set message metadata field
```

### SEE ALSO

* [kubemqctl events_store attach](kubemqctl_events_store_attach.md)	 - Attach to events store channels command
* [kubemqctl events_store list](kubemqctl_events_store_list.md)	 - Get a list of 'events store' channels / clients command
* [kubemqctl events_store receive](kubemqctl_events_store_receive.md)	 - Receive a messages from an 'events store'
* [kubemqctl events_store send](kubemqctl_events_store_send.md)	 - Send messages to an 'events store' channel command
