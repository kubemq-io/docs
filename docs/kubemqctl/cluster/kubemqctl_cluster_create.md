---
title: Create
lang: en-US
description: 'kubemqctl cluster create command'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

### Create Command

Create a KubeMQ cluster command

### Synopsis

Create command allows to deploy a KubeMQ cluster with configuration options

```
kubemqctl cluster create [flags]
```

### Examples

```

	# Create default KubeMQ cluster
	 kubemqctl cluster create -t b33600cc-93ef-4395-bba3-13131eb27d5e 

	# Create default KubeMQ cluster and watch events and status
	 kubemqctl cluster create -t b3d3600cc-93ef-4395-bba3-13131eb27d5e -w -s

	# Import KubeMQ cluster yaml file  
	 kubemqctl cluster create -f kubemq-cluster.yaml

	# Create KubeMQ cluster with options
	 kubemqctl cluster create -t b33d30scc-93ef-43565-bba3-13131sb2785e -o

	# Export KubeMQ cluster yaml file    
	 kubemqctl cluster create -t b3d330scc-93qf-4395-bba3-13131sb2785e -e 

```

### Options

```
  -e, --export         generate yaml configuration file output (exporting)
  -f, --file string    import configuration yaml file
  -h, --help           help for create
  -o, --options        create KubeMQ cluster with options
  -s, --status         stream real-time status events during KubeMQ cluster Create command
  -t, --token string   set KubeMQ Token
  -w, --watch          stream real-time events during KubeMQ cluster Create command
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

