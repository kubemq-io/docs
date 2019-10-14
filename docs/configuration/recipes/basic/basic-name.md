---
title: 'Set Cluster Name'
lang: en-US
type: 'article'
description: 'KubeMQ Cluster Recipes'
tags: ['pub/sub','message broker','KubeMQ']
---

## Set Cluster Name

KubeMQ default cluster name is 'kubemq-cluster'. If you want to set a different name, please follow the steps below:

### Use kubemqctl tool to set the Cluster name
Run the following commands:

- Create a KubeMQ cluster with options configuration (-o flag).

```bash
kubemqctl cluster create -t 1b124xxxxx6-4fra-49e9-94e1-aa29b7be70d6 -o
```

![basic-create.png](./images/basic-create.png)


- Select 'Set basic configuration'.

![basic-selection.png](./images/basic-selection.png)

- Select 'Set cluster name' .

![basic-name-1.png](./images/basic-name-1.png)


- Set the requested cluster name.

![basic-name-2.png](./images/basic-name-2.png)


- Press 'Enter' and deploy KubeMQ.

![basic-name-3.png](./images/basic-name-3.png)
