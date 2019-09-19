---
title: Send
lang: en-US
description: 'kubemqctl queries send command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Send Command

Send messages to a 'queries' channel command

### Synopsis

Send command allow to send messages to 'queries' channel with an option to set query time-out and caching parameters

```
kubemqctl queries send [flags]
```

### Examples

```

	# Send query to a 'queries' channel
	kubemqctl queries send some-channel some-query
	
	# Send query to a 'queries' channel with metadata
	kubemqctl queries send some-channel some-message -m some-metadata
	
	# Send query to a 'queries' channel with 120 seconds timeout
	kubemqctl queries send some-channel some-message -o 120
	
	# Send query to a 'queries' channel with cache-key and cache duration of 1m
	kubemqctl queries send some-channel some-message -c cache-key -d 1m

```

### Options

```
  -d, --cache-duration duration   set cache duration timeout (default 10m0s)
  -c, --cache-key string          set query cache key
  -h, --help                      help for send
  -m, --metadata string           set query message metadata field
  -o, --timeout int               set query timeout (default 30)
```

### SEE ALSO

* [kubemqctl queries attach](kubemqctl_queries_attach.md)	 - Attach to 'queries' channels command
* [kubemqctl queries receive](kubemqctl_queries_receive.md)	 - Receive a message from a 'queries' channel
* [kubemqctl queries send](kubemqctl_queries_send.md)	 - Send messages to a 'queries' channel command
