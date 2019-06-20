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


#### Configuration

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
```
helm install --name kubemq-release --set token={your kubemq token},nameOverride=my-kubemq-cluster kubemq-charts/kubemq 
```

### Docker-Compose

Run `docker-compose -d up` with the following yaml file:

```
version: '3.7'
services:
  kubemq:
    image: kubemq/kubemq
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

using KubeMQ.SDK.csharp.Events;
using KubeMQ.SDK.csharp.Subscription;
using System;

namespace kubemqreceiverExm
{
    class Program
    {
        private static Subscriber subscriber;
        static void Main(string[] args)
        {
            SubcribeToEventsWithoutStore();
        }

        private static void SubcribeToEventsWithoutStore()
        {
            subscriber = new Subscriber("localhost:50000");
            SubscribeRequest subscribeRequest = CreateSubscribeRequest(SubscribeType.Events);
            try
            {
                subscriber.SubscribeToEvents(subscribeRequest, HandleIncomingEvents);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"failed to sub on ex :{ex.Message}");
            }
            Console.ReadLine();

        }

        private static SubscribeRequest CreateSubscribeRequest(SubscribeType subscriptionType = SubscribeType.SubscribeTypeUndefined,
        EventsStoreType eventsStoreType = EventsStoreType.Undefined,
        int TypeValue = 0, string group = "")
        {
            Random random = new Random();
            SubscribeRequest subscribeRequest = new SubscribeRequest()
            {
                Channel = "myChannel",
                ClientID = "mySubID",
                EventsStoreType = eventsStoreType,
                EventsStoreTypeValue = TypeValue,
                Group = group,
                SubscribeType = subscriptionType
            };
            return subscribeRequest;
        }

        private static void HandleIncomingEvents(EventReceive @event)
        {
            if (@event != null)
            {
                string strMsg = string.Empty;
                object body = KubeMQ.SDK.csharp.Tools.Converter.FromByteArray(@event.Body);

                Console.WriteLine($"Subscriber Received Event: Metadata:'{@event.Metadata}', Channel:'{@event.Channel}', Body:'{strMsg}'");
            }
        }
    }
}

    
```

### Java
```

import io.kubemq.sdk.basic.ServerAddressNotSuppliedException;
import io.kubemq.sdk.event.lowlevel.Event;
import io.kubemq.sdk.event.lowlevel.Sender;

import javax.net.ssl.SSLException;

class EventSubscriber extends BaseExample {

    private Subscriber subscriber;

    EventSubscriber() throws ServerAddressNotSuppliedException, SSLException {
        super("EventSubscriber");
        Subscriber subscriber = new Subscriber("localhost:50000");
        SubcribeToEventsWithoutStore();
        SubcribeToEventsWithStore();

    }

    private void SubcribeToEventsWithStore() throws ServerAddressNotSuppliedException, SSLException {
        subscriber = new Subscriber();
        SubscribeRequest subscribeRequest = CreateSubscribeRequest(SubscribeType.EventsStore, EventsStoreType.StartAtSequence, 2);
        EventReceive eventReceive = subscriber.SubscribeToEvents(subscribeRequest);
        HandleIncomingEvents(eventReceive);
    }

    private void SubcribeToEventsWithoutStore() throws ServerAddressNotSuppliedException, SSLException {
        subscriber = new Subscriber();
        SubscribeRequest subscribeRequest = CreateSubscribeRequest(SubscribeType.Events);
        EventReceive eventReceive = subscriber.SubscribeToEvents(subscribeRequest);
        HandleIncomingEvents(eventReceive);
    }

    private void HandleIncomingEvents(EventReceive message) {
        String body = new String(message.getBody());

        System.out.println(MessageFormat.format(
                "Subscriber Received Event: Metadata:''{0}'', Channel:''{1}'', Body:''{2}''",
                message.getMetadata(),
                message.getChannel(),
                body
        ));
    }
}

public class BaseExample {
		protected Logger logger;
		private String channelName;
		private String clientID;
		private int timeout;

		public BaseExample(String _ClientId) {
			clientID = _ClientId;
			timeout = 111000;
			channelName = "MyTestChannelName";
			logger = LoggerFactory.getLogger(BaseExample.class);
		}
	    protected SubscribeRequest CreateSubscribeRequest(
            SubscribeType subscriptionType,
            EventsStoreType eventsStoreType,
            int TypeValue,
            String group
		)

		{
        SubscribeRequest subscribeRequest = new SubscribeRequest();

        subscribeRequest.setChannel(channelName);
        subscribeRequest.setClientID(generateRandomClientID());
        subscribeRequest.setEventsStoreType(eventsStoreType);
        subscribeRequest.setEventsStoreTypeValue(TypeValue);
        subscribeRequest.setGroup(group);
        subscribeRequest.setSubscribeType(subscriptionType);

        return subscribeRequest;
    }

    protected SubscribeRequest CreateSubscribeRequest(SubscribeType subscriptionType) {
        return CreateSubscribeRequest(subscriptionType, EventsStoreType.Undefined, 0, "");
    }

    protected SubscribeRequest CreateSubscribeRequest(SubscribeType subscriptionType, EventsStoreType eventsStoreType, int TypeValue) {
        return CreateSubscribeRequest(subscriptionType, eventsStoreType, TypeValue, "");
    }

    private String generateRandomClientID() {
        Random random = new Random();
        int low = 9;
        int high = 19999;
        return Integer.toString(random.nextInt(high - low) + low);
    }

    protected int getTimeout() {
        return timeout;
    }

    protected void setTimeout(int timeout) {
        this.timeout = timeout;
    }

    protected String getChannelName() {
        return channelName;
    }

    protected void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    protected String getClientID() {
        return clientID;
    }

    protected void setClientID(String clientID) {
        this.clientID = clientID;
    }
}
    
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
from builtins import input

from kubemq.events.subscriber import Subscriber
from kubemq.subscription.events_store_type import EventsStoreType
from kubemq.subscription.subscribe_request import SubscribeRequest
from kubemq.subscription.subscribe_type import SubscribeType


def create_subscribe_request(
        subscribe_type=SubscribeType.SubscribeTypeUndefined,
        events_store_type=EventsStoreType.Undefined,
        events_store_type_value=0):
    return SubscribeRequest(
        channel="TestChannelName",
        client_id="someID",
        events_store_type=events_store_type,
        events_store_type_value=events_store_type_value,
        group="",
        subscribe_type=subscribe_type
    )


def handle_incoming_events(event):
    if event:
        print("Subscriber Received Event: Metadata:'%s', Channel:'%s', Body:'%s'" % (
            event.metadata,
            event.channel,
            event.body
        ))


if __name__ == "__main__":
    print("Subscribing to event on channel example")

    # Subscribe to events without store
    subscriber = Subscriber("localhost:50000")
    subscribe_request = create_subscribe_request(SubscribeType.Events)
    subscriber.subscribe_to_events(subscribe_request, handle_incoming_events)

    input("Press 'Enter' to stop the application...
")
    
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

using KubeMQ.SDK.csharp.Events.LowLevel;
using System;

namespace kubemqsenderExm
{
    class Program
    {
        private static Sender sender;
        static void Main(string[] args)
        {
            SendLowLevelEvents();
        }
        private static void SendLowLevelEvents()
        {
            sender = new Sender("localhost:50000");
            Event @event = CreateLowLevelEventWithoutStore();
            try
            {
                sender.SendEvent(@event);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"failed to send on ex :{ex.Message}");
            }

        }
        private static Event CreateLowLevelEventWithoutStore()
        {
            Console.WriteLine("Start Creating Event");
            KubeMQ.SDK.csharp.Events.LowLevel.Event @event = new KubeMQ.SDK.csharp.Events.LowLevel.Event()
            {
                Metadata = "EventMetaData",
                Body = KubeMQ.SDK.csharp.Tools.Converter.ToByteArray($"hello world"),
                Store = false,
                Channel = "myChannel",
                ClientID = "myID",
                ReturnResult = false
            };
            return @event;
        }
    }
}

    
```

### Java
```

import io.kubemq.sdk.basic.ServerAddressNotSuppliedException;
import io.kubemq.sdk.event.lowlevel.Event;
import io.kubemq.sdk.event.lowlevel.Sender;

import javax.net.ssl.SSLException;

class EventSender extends BaseExample {

    EventSender() throws ServerAddressNotSuppliedException, SSLException {
        super("EventSender");
        SendLowLevelMessages();
    }

    private void SendLowLevelMessages() throws ServerAddressNotSuppliedException, SSLException {
        Sender sender = new Sender("localhost:50000");
        Event event = CreateLowLevelEventWithoutStore();
        sender.SendEvent(event);
    }
}

public class BaseExample {

    protected Logger logger;
    private String channelName;
    private String clientID;
    private int timeout;

    public BaseExample(String _ClientId) {
        clientID = _ClientId;
        timeout = 111000;
        channelName = "MyTestChannelName";
        logger = LoggerFactory.getLogger(BaseExample.class);
    }

    private Event CreateNewEvent() {
        logger.debug("Start Creating Event");
        Event message = new Event();
        message.setMetadata("MessageMetaData");
        message.setBody(MessageFormat.format("Event Created on time {0}", Instant.now()).getBytes());
        return message;
    }

    protected Event CreateLowLevelEventWithoutStore() {
        Event message = CreateNewEvent();
        message.setStore(false);
        message.setChannel(channelName);
        message.setClientID(clientID);
        message.setReturnResult(false);
        return message;
    }
	    private String generateRandomClientID() {
        Random random = new Random();
        int low = 9;
        int high = 19999;
        return Integer.toString(random.nextInt(high - low) + low);
    }

    protected int getTimeout() {
        return timeout;
    }

    protected void setTimeout(int timeout) {
        this.timeout = timeout;
    }

    protected String getChannelName() {
        return channelName;
    }

    protected void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    protected String getClientID() {
        return clientID;
    }

    protected void setClientID(String clientID) {
        this.clientID = clientID;
    }
}
    
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

from kubemq.events.lowlevel.event import Event
from kubemq.events.lowlevel.sender import Sender

if __name__ == "__main__":
    print("Sending event using sender example")

    sender = Sender("localhost:50000")
    event = Event(
        metadata="some-meta-data",
        body=("hello world").encode('UTF-8'),
        store=False,
        channel="TestChannelName",
        client_id="EventSender",
    )
    sender.send_event(event)
    
```
