---
title: 'Pub/Sub'
lang: en-US
type: 'article'
description: 'Get started with KubeMQ and Pub/Sub pattern'
tags: ['pub/sub','message broker','KubeMQ']
---
# Get Started with Pub/Sub <Badge text="v1.5.0+"/> <Badge text="stable"/>

## Table of Content
[[toc]]


## Get KubeMQ Token
Every installation method requires a KubeMQ token.

Please [register](https://account.kubemq.io/login/register?destination=docker) to obtain your KubeMQ token.


## Get KubeMQ CLI - kubemqctl

### macOS / Linux

```bash
curl -sL https://get.kubemq.io/install | sh 
```
### Windows

#### Option 1:

- [Download the latest kubemqctl.exe](https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl.exe).
- Place the file under e.g. `C:\Program Files\kubemqctl\kubemqctl.exe`
- Add that directory to your system path to access it from any command prompt

#### Option 2:
Run in PowerShell as administrator:

```powershell
New-Item -ItemType Directory 'C:\Program Files\kubemqctl'
Invoke-WebRequest https://github.com/kubemq-io/kubemqctl/releases/download/latest/kubemqctl.exe -OutFile 'C:\Program Files\kubemqctl\kubemqctl.exe'
[Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine) + ';C:\Program Files\kubemqctl', [EnvironmentVariableTarget]::Machine)
$env:Path += ';C:\Program Files\kubemqctl'
```


## Create KubeMQ Cluster

Run kubemqctl create cluster command:

``` bash
kubemqctl cluster create -t <YOUR_KUBEMQ_TOKEN>
```

For Example:

![kubemqctl-create-basic.gif](./images/kubemqctl-create-basic.gif)

## Connect Your KubeMQ Cluster

To be able to communicate with KubeMQ interface ports running in Kubernetes cluster, a Port Forward of KubeMQ's ports is needed.

kubemqctl has a handy command that will do it for you:

``` bash
kubemqctl cluster proxy
```


## Subscribe to Events Channel

A consumer can subscribe to the "hello-world" channel with one of the following methods.

<CodeSwitcher :languages="{bash:'kubemqctl',curl:'cURL',csharp:'.Net',java:`Java`,go:`Go`,py:`Python`,node:`Node`,php:`PHP`,ruby:`Ruby`,jquery:`jQuery`}" :isolated="true">

<template v-slot:bash>

Run the following kubemqctl command:

``` bash
kubemqctl events rec hello-world
```

When connected, a stream of events messages will be shown in the console.


</template>

<template v-slot:curl>

The following cURL command is using KubeMQ's REST interface:

``` bash
curl --location --request GET "http://localhost:9090/subscribe/events?client_id=some_client_id&channel=some_channel&group=some_group&subscribe_type=events" \
  --header "Content-Type: application/json" \
  --data ""
```

::: warning
Subscribe to Events in REST interface is using WebSocket for streaming (Push) events to the consumer. You will need to implement a WebSocket receiver accordingly.
:::
</template>


<template v-slot:csharp>

The following .NET code snippet is using KubeMQ's .NET SDK with gRPC interface:

``` csharp
using System;

namespace PubSub_Subscribe_to_a_Channel
{
    class Program
    {
        static void Main(string[] args)
        {

            var ChannelName = "hello-world";
            var ClientID = "hello-world-subscriber";
            var KubeMQServerAddress = "localhost:50000";
     
            var  subscriber = new KubeMQ.SDK.csharp.Events.Subscriber(KubeMQServerAddress);
            try
            {
                subscriber.SubscribeToEvents(new KubeMQ.SDK.csharp.Subscription.SubscribeRequest
                {
                    Channel = ChannelName,
                    SubscribeType = KubeMQ.SDK.csharp.Subscription.SubscribeType.Events,
                    ClientID = ClientID

                }, (eventReceive) =>
                {
           
                    Console.WriteLine($"Event Received: EventID:{eventReceive.EventID} Channel:{eventReceive.Channel} Metadata:{eventReceive.Metadata} Body:{ KubeMQ.SDK.csharp.Tools.Converter.FromByteArray(eventReceive.Body)} ");
                },
                (errorHandler) =>                 
                {
                    Console.WriteLine(errorHandler.Message);
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            Console.WriteLine("press any key to close PubSub_Subscribe_to_a_Channel");
            Console.ReadLine();
        }  
        
    }
}
```

When executed, a stream of events messages will be shown in the console.

</template>
<template v-slot:java>

The following Java code snippet is using KubeMQ's Java SDK with gRPC interface:

``` java
package io.kubemq.sdk.examples.get_Started.pubSub_Subscribe_to_a_Channel;

import java.io.IOException;

import javax.net.ssl.SSLException;

import io.grpc.stub.StreamObserver;
import io.kubemq.sdk.basic.ServerAddressNotSuppliedException;
import io.kubemq.sdk.event.EventReceive;
import io.kubemq.sdk.event.Subscriber;
import io.kubemq.sdk.subscription.SubscribeRequest;
import io.kubemq.sdk.subscription.SubscribeType;
import io.kubemq.sdk.tools.Converter;

public class Program {

    public static void main(String[] args)  {
        
        
        String channelName = "hello-world", clientID = "hello-world-subscriber", kubeMQAddress = "localhost:50000";
        Subscriber subscriber = new Subscriber(kubeMQAddress);
        SubscribeRequest subscribeRequest = new SubscribeRequest();
        subscribeRequest.setChannel(channelName);
        subscribeRequest.setClientID(clientID);
        subscribeRequest.setSubscribeType(SubscribeType.Events); 

        StreamObserver<EventReceive> streamObserver = new StreamObserver<EventReceive>() {

            @Override
            public void onNext(EventReceive value) {
                try {
                    System.out.printf("Event Received: EventID: %d, Channel: %s, Metadata: %s, Body: %s",
                            value.getEventId(), value.getChannel(), value.getMetadata(),
                            Converter.FromByteArray(value.getBody()));
                } catch (ClassNotFoundException e) {
                    System.out.printf("ClassNotFoundException: %s",e.getMessage());
                    e.printStackTrace();
                } catch (IOException e) {
                    System.out.printf("IOException:  %s",e.getMessage());
                    e.printStackTrace();
                }

            }

            @Override
            public void onError(Throwable t) {
                System.out.printf("Event Received Error: %s", t.toString());
            }

            @Override
            public void onCompleted() {

            }
        };
        try {
            subscriber.SubscribeToEvents(subscribeRequest, streamObserver);
        } catch (SSLException e) {
            System.out.printf("SSLException: %s", e.toString());
            e.printStackTrace();
        } catch (ServerAddressNotSuppliedException e) {
            System.out.printf("ServerAddressNotSuppliedException: %s", e.toString());
         e.printStackTrace();
      }
       
    }
}    
```
When executed, a stream of events messages will be shown in the console.

</template>
<template v-slot:go>

The following Go code snippet is using KubeMQ's Go SDK with gRPC interface:
``` go
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
When executed, a stream of events messages will be shown in the console.

</template>
<template v-slot:py>

The following Python code snippet is using KubeMQ's Python SDK with gRPC interface:

``` py
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
When executed, a stream of events messages will be shown in the console.

</template>

<template v-slot:node>

The following Node code snippet is using KubeMQ's REST interface:

``` js
var http = require('http');

var options = {
  'method': 'GET',
  'hostname': 'localhost',
  'port': '9090',
  'path': '/subscribe/events?client_id=some_client_id&channel=hello-world&group=some_group&subscribe_type=events',
  'headers': {
    'Content-Type': 'application/json',
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
```


::: warning
Subscribe to Events in REST interface is using WebSocket for streaming (Push) events to the consumer. You will need to implement a WebSocket receiver accordingly.
:::

</template>

<template v-slot:php>

The following PHP code snippet is using KubeMQ's REST interface:

``` php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://localhost:9090/subscribe/events?client_id=some_client_id&channel=hello-world&group=some_group&subscribe_type=events",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => false,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
} ?>
```


::: warning
Subscribe to Events in REST interface is using WebSocket for streaming (Push) events to the consumer. You will need to implement a WebSocket receiver accordingly.
:::

</template>


<template v-slot:ruby>

The following Ruby code snippet is using KubeMQ's REST interface:

``` ruby
require "uri"
require "net/http"

url = URI("http://localhost:9090/subscribe/events?client_id=some_client_id&channel=hello-world&group=some_group&subscribe_type=events")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)
request["Content-Type"] = "application/json"

response = http.request(request)
puts response.read_body
```


::: warning
Subscribe to Events in REST interface is using WebSocket for streaming (Push) events to the consumer. You will need to implement a WebSocket receiver accordingly.
:::

</template>


<template v-slot:jquery>

The following jQuery code snippet is using KubeMQ's REST interface:

``` js
var settings = {
  "url": "http://localhost:9090/subscribe/events?client_id=some_client_id&channel=hello-world&group=some_group&subscribe_type=events",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
```


::: warning
Subscribe to Events in REST interface is using WebSocket for streaming (Push) events to the consumer. You will need to implement a WebSocket receiver accordingly.
:::

</template>


</CodeSwitcher>



## Publish to Event Channel

After you have subscribed to a hello-world channel, you can send your message to it.


<CodeSwitcher :languages="{bash:'kubemqctl',curl:'cURL',csharp:'.Net',java:`Java`,go:`Go`,py:`Python`,node:`Node`,php:`PHP`,ruby:`Ruby`,jquery:`jQuery`}" :isolated="true">


<template v-slot:bash>

Run the following kubemqctl command:

``` bash
kubemqctl events send hello-world "Hi KubeMQ"
```


</template>


<template v-slot:curl>

The following cURL command is using KubeMQ's REST interface:

``` bash
curl --location --request POST "http://localhost:9090/send/event" 
  --header "Content-Type: application/json" 
  --data '{"EventID": "1234-5678-90","ClientID": "events-client-id","Channel": "events-channel","Metadata": "some-metadata","Body": "c29tZSBlbmNvZGVkIGJvZHk=","Store": false}'
```

A response for a successful command will look like this:

``` bash
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```
</template>

<template v-slot:csharp>

The following .NET code snippet is using KubeMQ's .NET SDK with gRPC interface:

``` csharp
using System;

namespace PubSub_Publish_to_a_Channel
{
    class Program
    {
        static void Main(string[] args)
        {
            var ChannelName = "hello-wrold";
            var ClientID = "hello-world-sender";
            var KubeMQServerAddress = "localhost:50000";


            var channel = new KubeMQ.SDK.csharp.Events.Channel(new KubeMQ.SDK.csharp.Events.ChannelParameters
            {
                ChannelName = ChannelName,
                ClientID = ClientID,
                KubeMQAddress = KubeMQServerAddress
            });

            try
            {
                var result = channel.SendEvent(new KubeMQ.SDK.csharp.Events.Event()
                {                  
                    Body = KubeMQ.SDK.csharp.Tools.Converter.ToByteArray("hello kubemq - sending single event")
                });
                if (!result.Sent)
                {
                    Console.WriteLine($"Could not send single message:{result.Error}");                 
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);          
            }
        }
    }
}

```

</template>
<template v-slot:java>

The following Java code snippet is using KubeMQ's Java SDK with gRPC interface:

``` java
package io.kubemq.sdk.examples.get_Started.pubSub_Publish_to_a_Channel;

import java.io.IOException;

import javax.net.ssl.SSLException;

import io.kubemq.sdk.basic.ServerAddressNotSuppliedException;
import io.kubemq.sdk.event.Event;
import io.kubemq.sdk.event.Result;
import io.kubemq.sdk.tools.Converter;

public class Program {

    public static void main(String[] args)  {
        
        String channelName = "hello-world", clientID = "hello-world-subscriber", kubeMQAddress = "localhost:50000";
    
        io.kubemq.sdk.event.Channel chan = new io.kubemq.sdk.event.Channel(channelName, clientID, false, kubeMQAddress);

        Event event = new Event();
        try {
            event.setBody(Converter.ToByteArray("hello kubemq - sending single event"));
        } catch (IOException e) {
            
            e.printStackTrace();
        }
        
        try {
            Result res = chan.SendEvent(event);
        } catch (SSLException | ServerAddressNotSuppliedException e) {
           
            e.printStackTrace();
        }

    }
} 
```

</template>
<template v-slot:go>

The following Go code snippet is using KubeMQ's Go SDK with gRPC interface:

``` go
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
   channelName := "hello-world"
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

</template>
<template v-slot:py>

The following Python code snippet is using KubeMQ's Python SDK with gRPC interface:

``` py
from kubemq.events.lowlevel.event import Event
from kubemq.events.lowlevel.sender import Sender

if __name__ == "__main__":
    print("Sending event using sender example")

    sender = Sender("localhost:50000")
    event = Event(
        metadata="some-meta-data",
        body=("hello world").encode('UTF-8'),
        store=False,
        channel="hello-world",
        client_id="EventSender",
    )
    sender.send_event(event)
    
```


</template>


<template v-slot:node>

The following node code snippet is using KubeMQ's REST interface:

``` js
var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'port': '9090',
  'path': '/send/event',
  'headers': {
    'Content-Type': 'application/json',
  }
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  "{\n    \"EventID\": \"1234-5678-90\",\n    \"ClientID\": \"events-client-id\",\n    \"Channel\": \"hello-world\",\n    \"Metadata\": \"some-metadata\",\n    \"Body\": \"c29tZSBlbmNvZGVkIGJvZHk=\",\n    \"Store\": false\n}";

req.write(postData);

req.end();
```

A response for a successful command will look like this:

``` bash
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```
</template>

<template v-slot:php>

The following PHP code snippet is using KubeMQ's REST interface:

``` php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://localhost:9090/send/event",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => false,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS =>"{\n    \"EventID\": \"1234-5678-90\",\n    \"ClientID\": \"events-client-id\",\n    \"Channel\": \"hello-world\",\n    \"Metadata\": \"some-metadata\",\n    \"Body\": \"c29tZSBlbmNvZGVkIGJvZHk=\",\n    \"Store\": false\n}",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
} ?>
```

A response for a successful command will look like this:

``` bash
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```
</template>


<template v-slot:ruby>

The following Ruby code snippet is using KubeMQ's REST interface:

``` ruby
require "uri"
require "net/http"

url = URI("http://localhost:9090/send/event")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request.body = "{\n    \"EventID\": \"1234-5678-90\",\n    \"ClientID\": \"events-client-id\",\n    \"Channel\": \"hello-world\",\n    \"Metadata\": \"some-metadata\",\n    \"Body\": \"c29tZSBlbmNvZGVkIGJvZHk=\",\n    \"Store\": false\n}"
response = https.request(request)
puts response.read_body
```

A response for a successful command will look like this:

``` bash
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```
</template>


<template v-slot:jquery>

The following jQuery code snippet is using KubeMQ's REST interface:

``` js
var settings = {
  "url": "http://localhost:9090/send/event",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
  },
  "data": "{\n    \"EventID\": \"1234-5678-90\",\n    \"ClientID\": \"events-client-id\",\n    \"Channel\": \"hello-world\",\n    \"Metadata\": \"some-metadata\",\n    \"Body\": \"c29tZSBlbmNvZGVkIGJvZHk=\",\n    \"Store\": false\n}",
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

A response for a successful command will look like this:

``` bash
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```
</template>


</CodeSwitcher>

## Demo


<div class="video-block">
    <iframe width="1280" height="720"
      src="https://www.youtube.com/embed/x02IXA9VpoU" frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
</div>

