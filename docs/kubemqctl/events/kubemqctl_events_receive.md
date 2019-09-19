---
title: Receive
lang: en-US
description: 'kubemqctl events receive command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Receive Command

Receive a message from 'events' channel command

### Synopsis

Receive (Subscribe) command allows to consume one or many messages from 'events' channel

```
kubemqctl events receive [flags]
```

### Examples

```

	# Receive messages from an 'events' channel (blocks until next message)
	kubemqctl events receive some-channel

	# Receive messages from an 'events' channel with group (blocks until next message)
	kubemqctl events receive some-channel -g G1


```

### Options

```
  -g, --group string   set 'events' channel consumer group (load balancing)
  -h, --help           help for receive
```


### SEE ALSO

* [kubemqctl events attach](kubemqctl_events_attach.md)	 - Attach to 'events' channels command
* [kubemqctl events receive](kubemqctl_events_receive.md)	 - Receive a message from 'events' channel command
* [kubemqctl events send](kubemqctl_events_send.md)	 - Send messages to an 'events' channel command

