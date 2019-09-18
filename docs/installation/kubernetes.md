---
title: Kubernetes
lang: en-US
type: 'article'
description: 'KubeMQ Kubernetes cluster deployment'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue']
---
# Kubernetes Deployment
## Table of Content
[[toc]]
## General
KubeMQ can be deployed in a Kubernetes cluster as s StatefulSet either by a yaml config file or by helm chart.


![image info](./images/kubernetes-cluster.png)

::: tip KubeMQ Token
Every installation method requires a KubeMQ token.
Please [register](https://account.kubemq.io/login/register?destination=docker) to obtain your KubeMQ token.
:::

## Kubemqctl

### With Default Options

Run Kubemqctl create cluster command:

``` bash
Kubemqctl cluster create -t <YOUR_KUBEMQ_TOKEN>
```

For Example:

![get-started-Kubemqctl.gif](./images/get-started-Kubemqctl.gif)

### With Configuration Options

Run Kubemqctl create cluster command:

``` bash
Kubemqctl cluster create -t <YOUR_KUBEMQ_TOKEN> -o
```

For Example:

![Kubemqctl-create-options.gif](./images/Kubemqctl-create-options.gif)

### With Yaml file

Run Kubemqctl create cluster command:

``` bash
Kubemqctl cluster create  -f kubemq-cluster.yaml
```


## YAML File

### Option 1 - Quick Deploy

``` bash
kubectl apply -f https://get.kubemq.io/deploy?token=<YOUR_KUBEMQ_TOKEN>
```



### Option 2 - KubeMQ Without Persistent Volume

1. Create filename `kubemq.yaml`
2. Copy the below yaml template file


``` yaml
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: kubemq-cluster
spec:
  selector:
    matchLabels:
      app: kubemq-cluster
  replicas: 3
  serviceName: kubemq-cluster
  template:
    metadata:
      labels:
        app: kubemq-cluster
    spec:
      containers:
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
            - name: CLUSTER_ROUTES
              value: 'kubemq-cluster:5228'
            - name: CLUSTER_PORT
              value: '5228'
            - name: CLUSTER_ENABLE
              value: 'true'
            - name: GRPC_PORT
              value: '50000'
            - name: REST_PORT
              value: '9090'
            - name: KUBEMQ_PORT
              value: '8080'
            - name: STORE_DIR
              value: '/store'  
          image: 'kubemq/kubemq:latest'
          name: kubemq-cluster
          ports:
            - containerPort: 50000
              name: grpc-port
              protocol: TCP
            - containerPort: 8080
              name: api-port
              protocol: TCP
            - containerPort: 9090
              name: rest-port
              protocol: TCP
            - containerPort: 5228
              name: cluster-port
              protocol: TCP
---
apiVersion: v1
kind: Service
metadata:
  name: kubemq-cluster-ext
spec:
  ports:
    - name: api-port
      port: 8080
      protocol: TCP
      targetPort: 8080
    - name: grpc-port
      port: 50000
      protocol: TCP
      targetPort: 50000
    - name: rest-port
      port: 9090
      protocol: TCP
      targetPort: 9090
  sessionAffinity: None
  type: NodePort
  selector:
    app: kubemq-cluster
---  
apiVersion: v1
kind: Service
metadata:
  name: kubemq-cluster
spec:
  ports:
    - name: cluster-port
      port: 5228
      protocol: TCP
      targetPort: 5228
  sessionAffinity: None
  type: ClusterIP
  selector:
    app: kubemq-cluster
```

3. Edit the file with your `KUBEMQ_TOKEN` instead of `<YOUR_KUBEMQ_TOKEN>`
4. Save the file
5. Deploy the file with command
``` bash
kubectl apply -f d:/kubemq.yaml
```

### Option 3 - KubeMQ With Persistent Volume

1. Create filename `kubemq.yaml`
2. Copy the below yaml template file

``` yaml
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: kubemq-cluster
spec:
  selector:
    matchLabels:
      app: kubemq-cluster
  replicas: 3
  serviceName: kubemq-cluster
  template:
    metadata:
      labels:
        app: kubemq-cluster
    spec:
      containers:
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
            - name: CLUSTER_ROUTES
              value: 'kubemq-cluster:5228'
            - name: CLUSTER_PORT
              value: '5228'
            - name: CLUSTER_ENABLE
              value: 'true'
            - name: GRPC_PORT
              value: '50000'
            - name: REST_PORT
              value: '9090'
            - name: KUBEMQ_PORT
              value: '8080'
            - name: STORE_DIR
              value: '/store'
          image: 'kubemq/kubemq:latest'
          name: kubemq-cluster
          ports:
            - containerPort: 50000
              name: grpc-port
              protocol: TCP
            - containerPort: 8080
              name: api-port
              protocol: TCP
            - containerPort: 9090
              name: rest-port
              protocol: TCP
            - containerPort: 5228
              name: cluster-port
              protocol: TCP
          volumeMounts:
            - name: kubemq-vol
              mountPath: '/store'
      restartPolicy: Always
  volumeClaimTemplates:
    - metadata:
        name: kubemq-vol
      spec:
        accessModes: [ "ReadWriteOnce" ]
        storageClassName:
        resources:
          requests:
            storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: kubemq-cluster-ext
spec:
  ports:
    - name: api-port
      port: 8080
      protocol: TCP
      targetPort: 8080
    - name: grpc-port
      port: 50000
      protocol: TCP
      targetPort: 50000
    - name: rest-port
      port: 9090
      protocol: TCP
      targetPort: 9090
  sessionAffinity: None
  type: NodePort
  selector:
    app: kubemq-cluster
---
apiVersion: v1
kind: Service
metadata:
  name: kubemq-cluster
spec:
  ports:
    - name: cluster-port
      port: 5228
      protocol: TCP
      targetPort: 5228
  sessionAffinity: None
  type: ClusterIP
  selector:
    app: kubemq-cluster
```

3. Edit the file with your `KUBEMQ_TOKEN` instead of `<YOUR_KUBEMQ_TOKEN>`
4. Save the file
5. Deploy the file with command
``` bash
kubectl apply -f d:/kubemq.yaml
```


Use KubeCtl to forward KubeMQ cluster ports:

``` bash
kubectl port-forward svc/kubemq-cluster-ext 8080:8080 9090:9090 50000:50000
```


## Helm Chart

Add KubeMQ Helm Repository:

``` bash
helm repo add kubemq-charts https://kubemq-io.github.io/charts
```

Verify KubeMQ helm repository charts is correctly configured by:
``` bash
helm repo list
```

Install KubeMQ Chart:

``` bash
helm install --name kubemq-cluster --set token=<YOUR_KUBEMQ_TOKEN> 
kubemq-charts/kubemq
```


### Configuration

The following table lists the configurable parameters of the KubeMQ chart and their default values.


| Parameter                           | Default           | Description                                                                                 |
|:-----------------------------------|:------------------|:--------------------------------------------------------------------------------------------|
| nameOverride                       | `kubemq-cluster`  | Sets deployment name                                                                        |
| token                              | ``                | Sets KubeMQ token                                                                           |
| replicaCount                       | `3`               | Number of KubeMQ nodes                                                                      |
| cluster.enable                     | `true`            | Enable/Disable cluster mode                                                                 |
| image.repository                   | `kubemq/kubemq`   | KubeMQ image name                                                                           |
| image.tag                          | `latest`          | KubeMQ image tag                                                                            |
| image.pullPolicy                   | `Always`          | Image pull policy                                                                           |
| service.type                       | `ClusterIP`       | Sets KubeMQ service type                                                                    |
| service.apiPort                    | `8080`            | Sets KubeMQ service Api Port                                                                |
| service.restPort                   | `9090`            | Sets KubeMQ service Rest Port                                                               |
| service.grpcPort                   | `5000`            | Sets KubeMQ service gRPC Port                                                               |
| service.clusterPort                | `5228`            | Sets KubeMQ service Cluster Port                                                            |
| livenessProbe.enabled              | `true`            | Enable/Disable liveness prob                                                                |
| livenessProbe.initialDelaySeconds  | `4`               | Delay before liveness probe is initiated                                                    |
| livenessProbe.periodSeconds        | `10`              | How often to perform the probe                                                              |
| livenessProbe.timeoutSeconds       | `5`               | When the probe times out                                                                    |
| livenessProbe.failureThreshold     | `6`               | Minimum consecutive successes for the probe to be considered successful after having failed |
| livenessProbe.successThreshold     | `1`               | Minimum consecutive failures for the probe to be considered failed after having succeeded   |
| readinessProbe.enabled             | `true`            | Enable/Disable readiness prob                                                               |
| readinessProbe.initialDelaySeconds | `1`               | Delay before readiness probe is initiated                                                   |
| readinessProbe.periodSeconds       | `10`              | How often to perform the probe                                                              |
| readinessProbe.timeoutSeconds      | `5`               | When the probe times out                                                                    |
| readinessProbe.failureThreshold    | `6`               | Minimum consecutive failures for the probe to be considered failed after having succeeded   |
| readinessProbe.successThreshold    | `1`               | Minimum consecutive successes for the probe to be considered successful after having failed |
| statefulset.updateStrategy         | `RollingUpdate`   | Statefulsets Update strategy                                                                |
| volume.enabled                     | `false`           | Enable/Disable Persistence Volume Claim template                                            |
| volume.size                        | `1Gi`             | Set volume size                                                                             |
| volume.mountPath                   | ` "/store" `      | Sets container mounting point                                                               |
| volume.accessMode                  | `"ReadWriteOnce"` | Sets Persistence access mode                                                                |

Specify each parameter using the `--set key=value[,key=value]` argument to helm install. For example,
``` bash
helm install --name kubemq-release --set token={your kubemq token}, \
nameOverride=my-kubemq-cluster kubemq-charts/kubemq 
```


Use KubeCtl to forward KubeMQ cluster ports:

``` bash
kubectl port-forward svc/kubemq-cluster-ext 8080:8080 9090:9090 50000:50000
```

::: warning PROXY
If KubeMQ fails to load, probably there is a proxy server which prevents the validation of KubeMQ token.
In order to fix this, you can add -e KUBEMQ_PROXY="your-proxy-url" as an environment variable.
:::

## Verify Deployment

Browse to KubeMQ's API end-point with GET request to `/health` path and get a json response like below:

For Example:
``` bash
curl --location --request GET "http://localhost:8080/health" \
  --header "Content-Type: application/json"
```

We received:

``` json
[
    {
        "host": "DESKTOP-LNB7P20",
        "utc_time": "2019-07-23T06:59:26.9534018Z",
        "grpc": {
            "connections": {
                "total": 0,
                "events_senders": 0,
                "events_stream_senders": 0,
                "events_receivers": 0,
                "events_store_receivers": 0,
                "requests_senders": 0,
                "responses_senders": 0,
                "commands_receivers": 0,
                "queries_receivers": 0,
                "queue_senders": 0,
                "queue_receivers": 0
            },
            "traffic": {
                "sent_events": 0,
                "received_events": 0,
                "sent_requests": 0,
                "sent_error": 0,
                "sent_responses": 0,
                "received_requests": 0,
                "sent_events_vol": 0,
                "received_events_vol": 0,
                "sent_requests_vol": 0,
                "sent_errors_vol": 0,
                "sent_responses_vol": 0,
                "received_requests_vol": 0,
                "send_queue_messages_vol": 0,
                "receive_queue_messages_vol": 0,
                "send_queue_messages": 0,
                "receive_queue_messages": 0,
                "total_messages": 0,
                "total_volume": 0
            }
        },
        "rest": {
            "connections": {
                "total": 0,
                "events_senders": 0,
                "events_stream_senders": 0,
                "events_receivers": 0,
                "events_store_receivers": 0,
                "requests_senders": 0,
                "responses_senders": 0,
                "commands_receivers": 0,
                "queries_receivers": 0,
                "queue_senders": 0,
                "queue_receivers": 0
            },
            "traffic": {
                "sent_events": 0,
                "received_events": 0,
                "sent_requests": 0,
                "sent_error": 0,
                "sent_responses": 0,
                "received_requests": 0,
                "sent_events_vol": 0,
                "received_events_vol": 0,
                "sent_requests_vol": 0,
                "sent_errors_vol": 0,
                "sent_responses_vol": 0,
                "received_requests_vol": 0,
                "send_queue_messages_vol": 0,
                "receive_queue_messages_vol": 0,
                "send_queue_messages": 0,
                "receive_queue_messages": 0,
                "total_messages": 0,
                "total_volume": 0
            }
        }
    }
]

```
