# Get Started
## Install
To start using KubeMQ, we first need to run a KubeMQ docker container either locally or on remote node.

You can select one of the methods below.

::: tip KubeMQ Token
Every installation method requires an KubeMQ token.
Please [register](https://account.kubemq.io/login/register?destination=docker) to obtain your KubeMQ token.
:::


### Docker
Pull and run KubeMQ Docker container:
```
docker run -d -p 8080:8080 -p 50000:50000 -p 9090:9090 -v kubemq-vol:/store -e KUBEMQ_TOKEN=<YOUR_KUBEMQ_TOKEN> kubemq/kubemq

```

### Kubernetes Cluster
Copy and deploy the following yaml file:
```
apiVersion: v1
kind: List
items:
  - apiVersion: apps/v1beta2
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
                  value: <YOUR_KUBEMQ_TOKEN>
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
              image: 'kubemq/kubemq:latest'
              imagePullPolicy: IfNotPresent
              name: kubemq-cluster
              ports:
                - containerPort: 50000
                  name: grpc-port
                  protocol: TCP
                - containerPort: 8080
                  name: metrics-port
                  protocol: TCP
                - containerPort: 9090
                  name: rest-port
                  protocol: TCP
                - containerPort: 5228
                  name: cluster-port
                  protocol: TCP
          restartPolicy: Always
  - apiVersion: v1
    kind: Service
    metadata:
      name: kubemq-cluster
    spec:
      ports:
        - name: metrics-port
          port: 8080
          protocol: TCP
          targetPort: 8080
        - name: grpc-port
          port: 50000
          protocol: TCP
          targetPort: 50000
        - name: cluster-port
          port: 5228
          protocol: TCP
          targetPort: 5228
        - name: rest-port
          port: 9090
          protocol: TCP
          targetPort: 9090
      sessionAffinity: None
      type: NodePort
      selector:
        app: kubemq-cluster

```

### Helm Chart

Add KubeMQ Helm Repository:
```
$ helm repo add kubemq-charts https://kubemq-io.github.io/charts
```

Verify kubemq helm repository charts is properly configured by:
```
$ helm repo list
```

Install KubeMQ Chart:
```
$ helm install --name kubemq-cluster --set token=<YOUR_KUBEMQ_TOKEN> kubemq-charts/kubemq
```

### Docker-Compose

Run `docker-compose -d up` with the following yaml file:

```
version: '3.7'
services:
  kubemq:
    image: kubemq/kubemq:v1.5.1
    container_name: kubemq
    ports:
      - "8080:8080"
      - "9090:9090"
      - "50000:50000"
    environment:
      - KUBEMQ_HOST=kubemq
      - KUBEMQ_TOKEN=<YOUR_KUBEMQ_TOKEN>
    networks:
      - backend
      - frontend
    volumes:
      - kubemq_vol:/store
networks:
  backend:
volumes:
  kubemq_vol:
```

## Subscribe

Now that you have KubeMQ installed and running, subscribe to Events channel and log every message over that channel on the console.

### CLI
```
$ ./kubetools subscribe event hello-world
```

::: tip KubeTools
KubeTools is KubeMQ CLI tool.
You can download KubeTools binaries [here](https://github.com/kubemq-io/kubetools/tree/master/bin).
:::

### .Net
```

```

### Java
```

```

### Go
```
package main

import (
	"context"
	"fmt"
	"github.com/kubemq-io/kubemq-go"
	"log"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	client, err := kubemq.NewClient(ctx,
		kubemq.WithAddress("localhost", 50000),
		kubemq.WithClientId("hello-world-subscriber"),
		kubemq.WithTransportType(kubemq.TransportTypeGRPC))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()
	channelName := "hello-world"
	errCh := make(chan error)
	eventsCh, err := client.SubscribeToEvents(ctx, channelName, "", errCh)
	if err != nil {
		log.Fatal(err)
		return

	}
	for {
		select {
		case err := <-errCh:
			log.Fatal(err)
			return
		case event, more := <-eventsCh:
			if !more {
				fmt.Println("Event Received, done")
				return
			}
			log.Printf("Event Received:\nEventID: %s\nChannel: %s\nMetadata: %s\nBody: %s\n", event.Id, event.Channel, event.Metadata, event.Body)
		case <-ctx.Done():
			return
		}
	}
}
```


### Python
```

```


## Send

After you have subscribed to hello-world channel, you can send your own message to it.

### CLI
```
$ ./kubetools send event hello-world "Hi KubeMQ"
```

::: tip KubeTools
KubeTools is KubeMQ CLI tool.
You can download KubeTools binaries [here](https://github.com/kubemq-io/kubetools/tree/master/bin).
:::

### .Net
```

```

### Java
```

```

### Go
```
package main

import (
	"context"
	"github.com/kubemq-io/kubemq-go"
	"log"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	client, err := kubemq.NewClient(ctx,
		kubemq.WithAddress("localhost", 50000),
		kubemq.WithClientId("hello-world-sender"),
		kubemq.WithTransportType(kubemq.TransportTypeGRPC))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()
	channelName := "testing_event_channel"
	err = client.E().
		SetId("some-id").
		SetChannel(channelName).
		SetMetadata("some-metadata").
		SetBody([]byte("hello kubemq - sending single event")).
		Send(ctx)
	if err != nil {
		log.Fatal(err)
	}

}

```


### Python
```

```
