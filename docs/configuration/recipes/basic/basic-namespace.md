---
title: 'Set Cluster Namespace'
lang: en-US
type: 'article'
description: 'KubeMQ Cluster Operations'
tags: ['pub/sub','message broker','KubeMQ']
---

## Set Cluster Namespace

KubeMQ default cluster namespace is 'kubemq'. If you want to set a different namespace, please follow the steps below:

### Use kubemqctl tool to set Cluster namespace
Run the following commands

- Create a KubeMQ cluster with options configuration (-o flag).

```bash
kubemqctl cluster create -t 1b124xxxxx6-4fra-49e9-94e1-aa29b7be70d6 -o
```

![basic-create.png](./images/basic-create.png)


- Select 'Set basic configuration'.

![basic-selection.png](./images/basic-selection.png)

- Select 'Set cluster namespace' .

![basic-namespace-1.png](./images/basic-namespace-1.png)


- Set the requested cluster namespace.

![basic-namespace-2.png](./images/basic-namespace-2.png)


- Press 'Enter' and deploy KubeMQ.

![basic-namespace3.png](./images/basic-namespace-3.png)
