---
title: Logs
lang: en-US
description: 'kubemqctl cluster logs command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Logs Command

Stream logs of KubeMQ cluster pods command

### Synopsis

Stream command allows to show pods logs with powerful filtering capabilities

```
kubemqctl cluster logs [flags]
```

### Examples

```

	# Stream logs with selection of KubeMQ cluster
	kubemqctl cluster logs

	# Stream logs of all pods in default namespace
	kubemqctl cluster logs .* -n default

	# Stream logs of regex base pods with logs since 10m ago
	kubemqctl cluster logs kubemq-cluster.* -s 10m

	# Stream logs of regex base pods with logs since 10m ago include the string of 'connection'
	kubemqctl cluster logs kubemq-cluster.* -s 10m -i connection

	# Stream logs of regex base pods with logs exclude the string of 'error'
	kubemqctl cluster logs kubemq-cluster.* -s 10m -e error

	# Stream logs of specific container
	kubemqctl cluster logs -c kubemq-cluster-0

```

### Options

```
  -c, --container string      Set container regex
      --disable-color         Set to disable colorized output
  -e, --exclude stringArray   Set strings to exclude
  -h, --help                  help for logs
  -i, --include stringArray   Set strings to include
  -l, --label string          Set label selector
  -n, --namespace string      Set default namespace
  -s, --since duration        Set since duration time
  -t, --tail int              Set how many lines to tail for each pod
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
