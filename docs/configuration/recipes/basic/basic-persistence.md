---
title: 'Set Persistence Volume'
lang: en-US
type: 'article'
description: 'KubeMQ Cluster Recipes'
tags: ['pub/sub','message broker','KubeMQ']
---

## Set Persistence Volume

KubeMQ default presistency is without PVC usage. If you want to set PVC for KubeMQ, please follow the steps below:

### Use kubemqctl tool to set Persistence Volume
Run the following commands:

- Create a KubeMQ cluster with options configuration (-o flag).

```bash
kubemqctl cluster create -t 1b124xxxxx6-4fra-49e9-94e1-aa29b7be70d6 -o
```

![basic-create.png](./images/basic-create.png)


- Select 'Set basic configuration'.

![basic-selection.png](./images/basic-selection.png)

- Select 'Set PVC' .

![basic-pvc-1.png](./images/basic-pvc-1.png)

- Set PVC size.

![basic-pvc-2.png](./images/basic-pvc-2.png)

- Press 'Enter' and deploy KubeMQ.
- 
![basic-pvc-3.png](./images/basic-pvc-3.png)
