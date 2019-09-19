---
title: List
lang: en-US
description: 'kubemqctl events store list command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### List Command

Get a list of 'events store' channels / clients command

### Synopsis

List command allows to get a list of 'events store' channels / clients with details

```
kubemqctl events_store list [flags]
```

### Examples

```

	# Get a list of events store channels
	kubemqctl events_store list
	
	# Get a list of events stores channels/ clients filtered by 'some-events-store' channel only
	kubemqctl events_store list -f some-events-store

```

### Options

```
  -f, --filter string   set filter for channel / client name
  -h, --help            help for list
```


### SEE ALSO

* [kubemqctl events_store attach](kubemqctl_events_store_attach.md)	 - Attach to events store channels command
* [kubemqctl events_store list](kubemqctl_events_store_list.md)	 - Get a list of 'events store' channels / clients command
* [kubemqctl events_store receive](kubemqctl_events_store_receive.md)	 - Receive a messages from an 'events store'
* [kubemqctl events_store send](kubemqctl_events_store_send.md)	 - Send messages to an 'events store' channel command
