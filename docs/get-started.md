# Install
To start using KubeMQ, we first need to run a KubeMQ docker container either locally or on remote node.

## Docker
Run
```
docker run -d -p 8080:8080 -p 50000:50000 -p 9090:9090 -v kubemq-vol:/store -e KUBEMQ_TOKEN=<YOUR_API_KEY> kubemq/kubemq

```
[https://account.kubemq.io/login/register?destination=docker](here)
 ::: tip Get Your API Key
    Please register [https://account.kubemq.io/login/register?destination=docker](here) to obtain your API key.
 :::
