# The KubeMQ Installation

## Register to KubeMQ
The KubeMQ server is free to use anytime.
Registration is needed to obtain the required KubeMQ token. This can be done at [Register KubeMQ](https://account.kubemq.io/login/register).


## Get KubeMQ

### Quick Wizard
Please visit the [Get KubeMQ](https://account.kubemq.io/home/get-kubemq/kubernetes) wizard for the quick set up guide.

### Manually
KubeMQ is delivered via a small Docker container. The KubeMQ Docker container can be pulled from Docker Hub or by downloading a tar file from GitHub.

**Docker Hub:**

Run
```
$ sudo docker pull docker.io/kubemq/kubemq
```

**GitHub tar file:**

Option 1:
1. Download kubemq.tar from [GitHub](https://github.com/kubemq-io/kubemq/releases)
2. Run
```
$ sudo docker import kubemq.tar
```

Option 2:
```
$ sudo docker import https://github.com/kubemq-io/kubemq/releases/[tag:release]
```


