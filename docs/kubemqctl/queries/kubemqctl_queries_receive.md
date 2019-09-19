---
title: Receive
lang: en-US
description: 'kubemqctl queries receive command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Receive Command

Receive a message from a 'queries' channel

### Synopsis

Receive (Subscribe) command allows to receive a message from a 'queries' channel and response with appropriate reply

```
kubemqctl queries receive [flags]
```

### Examples

```

	# Receive 'queries'  from a 'queries' channel (blocks until next message)
	kubemqctl queries receive some-channel

	# Receive 'queries' from a 'queries' channel with group(blocks until next message)
	kubemqctl queries receive some-channel -g G1

```

### Options

```
  -a, --auto-response   set auto response executed query
  -g, --group string    set 'queries' channel consumer group (load balancing)
  -h, --help            help for receive
```

### SEE ALSO

* [kubemqctl queries attach](kubemqctl_queries_attach.md)	 - Attach to 'queries' channels command
* [kubemqctl queries receive](kubemqctl_queries_receive.md)	 - Receive a message from a 'queries' channel
* [kubemqctl queries send](kubemqctl_queries_send.md)	 - Send messages to a 'queries' channel command
