---
title: Describe
lang: en-US
description: 'kubemqctl cluster describe command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Describe Command

Describe KubeMQ cluster command

### Synopsis

Describe command allows describing a KubeMQ cluster to console or export to a file

```
kubemqctl cluster describe [flags]
```

### Examples

```

 	# Describe KubeMQ cluster to console
	kubemqctl cluster describe

	# Describe KubeMQ cluster to a file
	kubemqctl cluster describe -f

```

### Options

```
  -f, --file   export to yaml file
  -h, --help   help for describe
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
