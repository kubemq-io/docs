---
title: 'Secure Cluster'
lang: en-US
type: 'article'
description: 'KubeMQ Cluster Operations'
tags: ['pub/sub','message broker','KubeMQ']
---

## Set Cluster Authentication

KubeMQ supports the setting of TLS Authentication certifications and keys for both gRPC and REST interfaces.

### Use kubemqctl tool to set TLS certificates for KubeMQ interfaces
Run the following commands

- Create KubeMQ cluster with options configuration (-o flag)

```bash
kubemqctl cluster create -t 1b124xxxxx6-4fra-49e9-94e1-aa29b7be70d6 -o
```

![config-security-1.png](./images/config-security-1.png)

- Select 'Set Authentication Parameters'

![config-security-2.png](./images/config-security-2.png)

- Select the desired configurations interfaces (you can set for each one of the interfaces or a specific one)

![config-security-3.png](./images/config-security-3.png)

- Set Certificate :
    - Select 'New Secret' if you wish to upload a new secret
    - Select 'Use Existing Secret' if you want to use already loaded secret
    
![config-security-4.png](./images/config-security-4.png)

- Press Enter to load default OS editor for upload a certificate data

![config-security-5.png](./images/config-security-5.png)

- Copy/Paste certificate data, save and quit the editor.

![config-security-6.png](./images/config-security-6.png)

- Press Enter to load default OS editor for upload a key data

![config-security-7.png](./images/config-security-7.png)

- Copy/Paste key data, save and quit the editor.

![config-security-8.png](./images/config-security-8.png)

- Press Enter and start deploying KubeMQ

![config-security-9.png](./images/config-security-9.png)



If you have selected more than one interface, the above process will be repeated.
