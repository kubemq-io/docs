---
title: 'Expose Cluster'
lang: en-US
type: 'article'
description: 'KubeMQ Cluster Recipes'
tags: ['pub/sub','message broker','KubeMQ']
---

## Expose Cluster Ports

KubeMQ supports the setting of exposing gRPC, REST, and API services in 3 modes:
 - ClusterIP - Ports are exposed only to internal cluster services.
 - NodePort - Ports are exposed to random ports on each cluster Node.
 - LoadBalancer - Ports are exposed externally with Load Balancer

### Use kubemqctl tool to set Cluster Service Mode
Run the following commands:

- Create a KubeMQ cluster with options configuration (-o flag).

```bash
kubemqctl cluster create -t 1b124xxxxx6-4fra-49e9-94e1-aa29b7be70d6 -o
```

![basic-create.png](./images/basic-create.png)

- Select 'Set Basic Configuration' .

![basic-expose-1.png](./images/basic-expose-1.png)


- Select 'Set cluster service mode' .

![basic-expose-2.png](./images/basic-expose-2.png)

- Select the requested mode.

![basic-expose-3.png](./images/basic-expose-3.png)


- Press 'Enter' and deploy KubeMQ.

![basic-expose-4.png](./images/basic-expose-4.png)
