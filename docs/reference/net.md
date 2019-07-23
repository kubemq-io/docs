---
title: .NET
lang: en-US
description: '.NET KubeMQ SDK reference'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','.net','c#']
---

# .NET
.NET client SDK for KubeMQ. Simple interface to work with the KubeMQ server.
## Table of Content
[[toc]]

## General SDK description
The SDK implements all communication patterns available through the KubeMQ server:
- Events
- EventStore
- Command
- Query

## Installation:
```
  Install-Package KubeMQ.SDK.csharp -Version 1.0.0
```

### Supports:
- .NET Framework 4.6.1
- .NET Framework 4.7.1
- .NET Standard 2.0


## Configuration
The only required configuration setting is the KubeMQ server address.

Configuration can be set by using one of the following:
- Environment Variable
- `appsettings.json` file
- `app.Config` or `Web.config` file
- Within the code


### Configuration via Environment Variable
Set `KubeMQServerAddress` to the KubeMQ Server Address


### Configuration via appsettings.json
Simply add the following to your appsettings.json:
```json
{
  "KubeMQ": {
    "serverAddress": "{YourServerAddress}:{YourServerPort}"
  }
}
```


### Configuration via app.Config
Simply add the following to your app.config:
```xml
<configuration>  
   <configSections>  
    <section name="KubeMQ" type="System.Configuration.NameValueSectionHandler"/>      
  </configSections>  
    
  <KubeMQ>  
    <add key="serverAddress" value="{YourServerAddress}:{YourServerPort}"/>
  </KubeMQ>  
</configuration>
```


### Configuration via code
When setting the KubeMQ server address within the code, simply pass the address as a parameter to the various constructors.
See exactly how in the code examples in this document.


## Usage: Main concepts

- **Channel:** Represents the endpoint target. One-to-one or one-to-many. Real-Time Multicast.
- **Group:** Optional parameter when subscribing to a channel. A set of subscribers can define the same group so that only one of the subscribers within the group will receive a specific event. Used mainly for load balancing. Subscribing without the group parameter ensures receiving all the channel messages. (When using Grouping all the programs that are assigned to the group need to have to same channel name)
- **Metadata:** The metadata allows us to pass additional information with the event. Can be in any form that can be presented as a string, i.e., struct, JSON, XML and many more.
- **Body:** The actual content of the event. Can be in any form that is serializable into a byte array, i.e., string, struct, JSON, XML, Collection, binary file and many more.
- **ClientID:**  Displayed in logs, tracing and KubeMQ dashboard(When using EventStore it must be unique).
- **Event Store:** The Event Store represents a persistence storge, should be used when need to store data on a volume.

### The SubscribeRequest Object:
A struct that is used to initialize SubscribeToEvents/SubscribeToRequest,
the SubscribeRequest contains the following:
- SubscribeType - Mandatory -  Enum that represent the subscription type:
    - Events - if there is no need for Persistence.
    - EventsStore - If you want to receive Events from persistence [See Main concepts](#usage-main-concepts).
    - Command - Should be used when a response is not needed.
    - Query - Should be used when a response is needed.
- ClientID - Mandatory - [See Main concepts](#usage-main-concepts)
- Channel - Mandatory - [See Main concepts](#usage-main-concepts)
- Group - Optional - [See Main concepts](#usage-main-concepts)
- EventsStoreType - Mandatory - set the type event store to subscribe to [Main concepts](#usage-main-concepts).

## Usage: Event\EventStore
Employing several variations of point to point Event communication style patterns.
Allows to connect a sender to one or a group of subscribers
- Subscribe to events
- Send stream
- Send single event

### The `KubeMQ.SDK.csharp.Events.LowLevel.Event` object:
Struct used to send and receive Events using the Event pattern. Contains the following fields (See [Main concepts](#usage-main-concepts) for more details on each field):
- Channel
- Metadata
- Body
- EventID - set internally
- Store - Boolean, set if the event should be sent to store.
- ClientID

### The 'EventsStoreType' object:
To receive events from persistence, the subscriber need to assign one of seven EventsStoreType and the value for EventsStoreTypeValue.
- EventsStoreTypeUndefined - 0 - Should be set when there is no need for eventsStore.(when using this type there is no need to            set EventsStoreTypeValue)
- StartNewOnly - 1 - The subscriber will only receive new events (from the time he subscribed).(when using this type there is              no need to set EventsStoreTypeValue)
- StartFromFirst - 2 - The subscriber will receive all events from the start of the queue and all future events as well.(when              using this type there is no need to set EventsStoreTypeValue)
- StartFromLast - 3 - The subscriber will receive the last event in queue and all future events as well.(when using this type              there is no need to set EventsStoreTypeValue)
- StartAtSequence - 4 - The subscriber will receive events from the chosen Sequence and all future events as well. (need to                provide with long that of the wanted eventID)
- StartAtTime - 5 - The subscriber will receive events that were "Stored" from a certain DateTime and all future events as well.            (need to provide with chosen time)
- StartAtTimeDelta - 6 - The subscriber will receive events that were "Stored" from the difference between DateTime.Now minus              the delta was chosen. (need to provide with a long that represents the time delta to check within milliseconds)

### Method: Subscribe
This method allows subscribing to events. Both single and stream of events.
Pass a delegate (callback) that will handle the incoming event(s).
The implementation uses `await` and does not block the continuation of the code execution.

**Parameters**:

- SubscribeRequest - Mandatory-[See SubscribeRequest](#the-subscriberequest-object).
- Handler - Mandatory. Delegate (callback) that will handle the incoming events.

Initialize `Subscriber` with server address from code:
``` csharp
string serverAddress = "localhost:50000";
Subscriber subscriber = new Subscriber(serverAddress);
```
Initialize `Subscriber` with server address set in configuration:
``` csharp
Subscriber subscriber = new Subscriber();
```

Subscribe:
``` csharp
string channel = "Sample.test1";
// Set a SubscribeRequest without Store and with Group.
SubscribeRequest subscribeRequest = new SubscribeRequest(SubscribeType.Events, "MyClientID", channel, EventsStoreType.Undefined, 0, "MyGroup");
subscriber.SubscribeToEvents(subscribeRequest,HandleIncomingEvents);

// delegate to handle the incoming events
private void HandleIncomingEvents(EventReceive @event)
{
...
}
```

### Method: send single
This method allows for sending a single event.

**parameters**:
- KubeMQ.SDK.csharp.Events.LowLevel.Event - Mandatory. The actual Event that will be sent.

Initialize `Sender` with server address from code (also can be initialized using config file):
``` csharp
 string serverAddress = "localhost:50000";
 KubeMQ.SDK.csharp.Events.LowLevel.Sender sender = new KubeMQ.SDK.csharp.Events.LowLevel.Sender(serverAddress);
 
// Create the Event
KubeMQ.SDK.csharp.Events.LowLevel.Event @event = new KubeMQ.SDK.csharp.Events.LowLevel.Event()
{
    Channel = "Sample.test1",
    Metadata = "A sample string Metadata",
    Body = Tools.Converter.ToByteArray("Pubsub test Event"),
    ClientID="MyID",
    Store=false
};
// SendEvent
sender.SendEvent(@event);
```

### Method: send stream
This method allows for sending a stream of events.
Use cases: sending a file in multiple packets; frequent high rate of events.

Initialize `Sender` with server address from code (also can be initialized using config file):
``` csharp
string serverAddress = "localhost:50000";
Sender sender = new Sender(serverAddress);

KubeMQ.SDK.csharp.Events.LowLevel.Event @event;

for (int i = 1; i < 11; i++)
{
    event = CreateSimpleStringEvent(i);
    
    sender.StreamEvent(@event);

    Thread.Sleep(1000);
}
sender.ClosesEventStreamAsync();

 
private KubeMQ.SDK.csharp.Events.LowLevel.Event CreateSimpleStringEvent(int i = 0)
{
    return new KubeMQ.SDK.csharp.Events.LowLevel.Event()
    {
        Channel = "Sample.test1",
        Metadata = "A sample string Metadata",
        Body = Tools.Converter.ToByteArray("Pubsub test event "+ i)
        ClientID="MyID",
        Store=false
    };
}
```

## Usage: Command\Query
Request\Reply communication pattern. Allows caching the response at the KubeMQ server.
- Subscribe to requests
- Send request

### Cache mechanism
KubeMQ server allows storing each response in a dedicated cache system. Each request can specify whether or not to use the cache.
In case the cache is used, the KubeMQ server will try to return the response directly from the cache and reduce latency.

To use the cache mechanism, add the following parameters to each `Request`:
- CacheKey - Unique key to store the response in the KubeMQ cache mechanism.
- CacheTTL - Cache data Time to live in milliseconds per CacheKey.

In the `Response` object you will receive an indication whether it was returned from cache:
- CacheHit - Indication if the response was returned from KubeMQ cache.

### The `KubeMQ.SDK.csharp.CommandQuery.LowLevel.Request` object:
Struct used to send the request under the Request\Reply pattern. Contains the following fields (See Main concepts for more details on some field):
- RequestID - Optional. Used to match Request to Response. If omitted, it will be set internally.
- RequestType - Mandatory. Used to set if a response is expected or not.
- ClientID - Mandatory. Displayed in logs, tracing, and KubeMQ dashboard.
- Channel - Mandatory. The channel that the `Responder` subscribed on.
- Metadata - Mandatory.
- ReplyChannel - Read-only, set internally.
- Timeout - Mandatory. Max time for the response to return. Set per request. If exceeded an exception is thrown.
- CacheKey - Optional.
- CacheTTL - Optional.

### The `Response` object:
Struct used to send the response under the Request\Reply pattern.

The `Response` Constructors requires the corresponding 'Request' object.

Contains the following fields (See Main concepts for more details on some field):
- ClientID - Mandatory. Represents the sender ID the response was sent from.
- RequestID - Set internally, used to match Request to Response.
- CacheHit - Set internally, indication if the response was returned from KubeMQ cache.
- ReplyChannel - Set internally, an indication the channel to send him the response.
- Metadata - Mandatory.
- Body - Mandatory.
- Timestamp -Set Internally, an indication of the time the response was created.
- Executed - Boolean that represents of the task the Responder was performed.
- Error - Mandatory - Represents if an error occurred while processing the request.

### Method: Subscribe to requests
This method allows subscribing to receive requests.

**parameters**:
- SubscribeRequest - Mandatory-[See SubscribeRequest](#the-subscriberequest-object).
- Handler - Mandatory. Delegate (callback) that will handle the incoming requests.

Initialize `Responder` with server address from code:
``` csharp
string serverAddress = "localhost:50000";
Responder responder = new Responder(serverAddress);
```

Initialize `Responder` with server address set in configuration:
``` csharp
Responder responder = new Responder();
```

Subscribe
``` csharp
string channel = "MyChannel.SimpleRequest";

//Subscribe to request expecting to send a response(Queries) and no group.
SubscribeRequest subscribeRequest = new SubscribeRequest(SubscribeType.Queries, "MyClientID", channel, EventsStoreType.Undefined, 0);
responder.SubscribeToRequests(subscribeRequest,HandleIncomingRequests);

```
Handle requests and return responses
``` csharp
// delegate to handle the incoming requests
private Response HandleIncomingRequests(Request request)
{
    // Convert the request Body to a string
    string strBody = Tools.Converter.FromByteArray(request.Body).ToString();
    logger.LogDebug($"Respond to Request. ID:'{request.ID}', Channel:'{request.Channel}', Body:'{strBody}'");
    
    // Create the Response object
    Response response = new Response(request)
    {
          Body = Converter.ToByteArray("OK"),
          Error = "None",
          ClientID = this.ClientID,
          Executed = true,
          Metadata = "OK",
     };
     return response;
}
```

### Send request methods
The KubeMQ SDK comes with two similar methods to send a `Request` and wait for the `Response`
- `SendRequestAsync` returns the `Response` in a Task
- `SendRequest` returns the `Response` to the Delegate (callback) supplied as a parameter

### Method: send request Async
This method allows to send a request to the `Responder,` it awaits for the `Response` and returns it in a Task

**parameters**:
- KubeMQ.SDK.csharp.CommandQuery.LowLevel.Request - Mandatory. The `Request` object to send.

Initialize `Initiator` with server address from code (also can be initialized using config file):
``` csharp
string serverAddress = "localhost:50000";
Initiator initiator = new Initiator(serverAddress);
```

Send Request and await for Response
``` csharp
KubeMQ.SDK.csharp.CommandQuery.LowLevel.Request request = KubeMQ.SDK.csharp.CommandQuery.LowLevel.new Request()
            {
                Channel = "MyChannel.SimpleRequest",
                Metadata = "MyMetadata",
                Body = Tools.Converter.ToByteArray("A Simple Request."),
                Timeout = 5000,
                CacheKey = "Simple.CacheKey",
                CacheTTL = 5000,
                RequestType=RequestType.Query,
                ClientID="MyClientID"
            };
            
Response response = initiator.SendRequest(request);


//Async
Response response = await initiator.SendRequestAsync(request);
```
### Method: send request
This method allows to send a request to the `Responder`, and returns the `Response` to the Delegate (callback) supplied as a parameter

``` csharp
initiator.SendRequest(HandleResponse, request);

// Method to handle the responses
public void HandleResponse(Response response)
{
    ...
}
```

## Usage: Channel
Creating a Sender\Initiator with a set of predefined parameters to prevent repetitive code.

*Replaces the channel parameter in the "low level" Event/Request.

### KubeMQ.SDK.csharp.Events.Channel
Represents a Sender with a set of predefined parameters.

**parameters**:
- KubeMQ.SDK.csharp.Events.ChannelParameters - Mandatory. # .NET
.NET client SDK for KubeMQ. Simple interface to work with the KubeMQ server.

