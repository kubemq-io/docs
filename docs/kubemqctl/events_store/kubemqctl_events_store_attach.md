---
title: Attach
lang: en-US
description: 'kubemqctl events store attach command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Attach Command

Attach to events store channels command

### Synopsis

Attach command allows to display 'events store' channel content for debugging proposes

```
kubemqctl events_store attach [flags]
```

### Examples

```

	# Attach to all events store channels and output running messages
	kubemqctl events attach *
	
	# Attach to some-events-store 'events store' channel and output running messages
	kubemqctl events_store attach some-events-store

	# Attach to some-events-store1 and some-events-store2 'events store' channels and output running messages
	kubemqctl events attach some-events-store1 some-events-store2 

	# Attach to some-events-store 'events store' channel and output running messages filter by include regex (some*)
	kubemqctl events attach some-events -i some*

	# Attach to some-events-store 'events store' channel and output running messages filter by exclude regex (not-some*)
	kubemqctl events attach some-events -e not-some*

```

### Options

```
  -e, --exclude stringArray   set (regex) strings to exclude
  -h, --help                  help for attach
  -i, --include stringArray   set (regex) strings to include
```


### SEE ALSO

* [kubemqctl events_store attach](kubemqctl_events_store_attach.md)	 - Attach to events store channels command
* [kubemqctl events_store list](kubemqctl_events_store_list.md)	 - Get a list of 'events store' channels / clients command
* [kubemqctl events_store receive](kubemqctl_events_store_receive.md)	 - Receive a messages from an 'events store'
* [kubemqctl events_store send](kubemqctl_events_store_send.md)	 - Send messages to an 'events store' channel command
