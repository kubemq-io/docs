---
title: Scale
lang: en-US
description: 'kubemqctl cluster scale command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Scale Command

Scale KubeMQ cluster replicas command

### Synopsis

Scale command allows ro scale KubeMQ cluster replicas

```
kubemqctl cluster scale [flags]
```

### Examples

```

	# Scale KubeMQ cluster StatefulSet 
	kubemqctl cluster cluster scale 5

	# Scale KubeMQ cluster StatefulSet with streaming real-time events and status
	kubemqctl cluster scale -w -s 

	# Scale KubeMQ cluster StatefulSet to 0
	kubemqctl cluster scale 0

```

### Options

```
  -h, --help     help for scale
  -s, --status   watch and print Scale StatefulSet status
  -w, --watch    watch and print Scale StatefulSet events
```

### SEE ALSO

* [kubemqctl cluster apply](kubemqctl_cluster_apply.md)	 - Apply a KubeMQ cluster command
* [kubemqctl cluster context](kubemqctl_cluster_context.md)	 - Select kubernetes cluster context command
* [kubemqctl cluster create](kubemqctl_cluster_create.md)	 - Create a KubeMQ cluster command
* [kubemqctl cluster dashboard](kubemqctl_cluster_dashboard.md)	 - Dashboard command allows to start a web view of KubeMQ cluster dashboard
* [kubemqctl cluster delete](kubemqctl_cluster_delete.md)	 - Delete KubeMQ cluster command
* [kubemqctl cluster describe](kubemqctl_cluster_describe.md)	 - Describe KubeMQ cluster command
* [kubemqctl cluster events](kubemqctl_cluster_events.md)	 - Show KubeMQ cluster events command
* [kubemqctl cluster get](kubemqctl_cluster_get.md)	 - Get information of KubeMQ of clusters command
* [kubemqctl cluster logs](kubemqctl_cluster_logs.md)	 - Stream logs of KubeMQ cluster pods command
* [kubemqctl cluster proxy](kubemqctl_cluster_proxy.md)	 - Proxy KubeMQ cluster connection to localhost command
* [kubemqctl cluster scale](kubemqctl_cluster_scale.md)	 - Scale KubeMQ cluster replicas command
