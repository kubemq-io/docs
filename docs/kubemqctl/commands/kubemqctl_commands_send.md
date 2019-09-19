---
title: Send
lang: en-US
description: 'kubemqctl commands send command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Send Command

Send messages to 'commands' channel command

### Synopsis

Send command allow to send messages to 'commands' channel with an option to set command time-out

```
kubemqctl commands send [flags]
```

### Examples

```

	# Send command to a 'commands' channel
	kubemqctl commands send some-channel some-command
	
	# Send command to a 'commands' channel with metadata
	kubemqctl commands send some-channel some-message -m some-metadata
	
	# Send command to a 'commands' channel with 120 seconds timeout
	kubemqctl commands send some-channel some-message -o 120

```

### Options

```
  -h, --help              help for send
  -m, --metadata string   Set metadata message
  -o, --timeout int       Set command timeout (default 30)
```

### SEE ALSO

* [kubemqctl commands attach](kubemqctl_commands_attach.md)	 - Attach to 'commands' channels command
* [kubemqctl commands receive](kubemqctl_commands_receive.md)	 - Receive a message from 'commands' channel command
* [kubemqctl commands send](kubemqctl_commands_send.md)	 - Send messages to 'commands' channel command

