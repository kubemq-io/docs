---
title: 'Set Proxy'
lang: en-US
type: 'article'
description: 'KubeMQ Cluster Recipes'
tags: ['pub/sub','message broker','KubeMQ']
---

## Set Proxy

In case when Kubernetes cluster is behind a Proxy server, you will need to provide the Proxy server settings to validate your API token during cluster boot. Please follow the steps below:

### Use kubemqctl tool to set proxy data
Run the following commands:

- Create a KubeMQ cluster with options configuration (-o flag).

```bash
kubemqctl cluster create -t 1b124xxxxx6-4fra-49e9-94e1-aa29b7be70d6 -o
```

![basic-create.png](./images/basic-create.png)

- Select 'Set Licensing Parameters.'

![basic-license-1.png](./images/basic-license-1.png)

- Press 'Enter' to skip 'License Data' .

- Enter Proxy settings (host:port format)

![basic-proxy-1.png](./images/basic-proxy-1.png)

- Press 'Enter' and deploy KubeMQ.

![basic-proxy-2.png](./images/basic-proxy-2.png)
