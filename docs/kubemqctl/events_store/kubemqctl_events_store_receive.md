---
title: Receive
lang: en-US
description: 'kubemqctl events store receive command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Receive Command

Receive a messages from an 'events store'

### Synopsis

Receive (Subscribe) command allows to consume messages from an 'events store' with options to set offset parameters

```
kubemqctl events_store receive [flags]
```

### Examples

```

	# Receive messages from an 'events store' channel (blocks until next message)
	kubemqctl events_store receive some-channel

	# Receive messages from an 'events channel' with group(blocks until next message)
	kubemqctl events_store receive some-channel -g G1

```

### Options

```
  -g, --group string   set 'events_store' channel consumer group (load balancing)
  -h, --help           help for receive
```

### SEE ALSO

* [kubemqctl events_store attach](kubemqctl_events_store_attach.md)	 - Attach to events store channels command
* [kubemqctl events_store list](kubemqctl_events_store_list.md)	 - Get a list of 'events store' channels / clients command
* [kubemqctl events_store receive](kubemqctl_events_store_receive.md)	 - Receive a messages from an 'events store'
* [kubemqctl events_store send](kubemqctl_events_store_send.md)	 - Send messages to an 'events store' channel command
