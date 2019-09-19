---
title: Receive
lang: en-US
description: 'kubemqctl commands receive command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Receive Command

Receive a message from 'commands' channel command

### Synopsis

Receive (Subscribe) command allows to consume a message from 'commands' channel and response with appropriate reply

```
kubemqctl commands receive [flags]
```

### Examples

```

	# Receive commands from a 'commands' channel (blocks until next message)
	kubemqctl commands receive some-channel

	# Receive commands from a 'commands' channel with group (blocks until next message)
	kubemqctl commands receive some-channel -g G1

```

### Options

```
  -a, --auto-response   set auto response executed command for each command received
  -g, --group string    set 'commands' channel consumer group (load balancing)
  -h, --help            help for receive
```

### SEE ALSO

* [kubemqctl commands attach](kubemqctl_commands_attach.md)	 - Attach to 'commands' channels command
* [kubemqctl commands receive](kubemqctl_commands_receive.md)	 - Receive a message from 'commands' channel command
* [kubemqctl commands send](kubemqctl_commands_send.md)	 - Send messages to 'commands' channel command



