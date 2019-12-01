---
title: Go
lang: en-US
description: 'Golang KubeMQ SDK reference'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','go']
---

# Go
This library is Go implementation of KubeMQ client connection.
## Table of Content
[[toc]]
## Installation
`$ go get -u github.com/kubemq-io/kubemq-go
`

## Core Basics
KubeMQ messaging broker has five messaging patterns:

- Queues - FIFO based, exactly one durable queue pattern
- Events - real-time pub/sub pattern
- Events Store - pub/sub with persistence pattern
- Commands - the Command part of CQRS pattern, which sends commands with the response for executed or not (with proper error messaging)
- Queries - the Query part of CQRS pattern, which sends a query and gets a response with the relevant query result back

For each one of the patterns, we can distinguish between the senders and the receivers.

For events and events store, the KubeMQ supports both RPC and upstream calls.

the data model is almost identical between all the pattern with some data added related to the specific patter.

The common part of all the patterns are:

- Id - the sender can set the Id for each type of message, or the Id is automatically generated a UUID Id for him.
- Metadata - a string field that can hold any metadata related to the message
- Body - a Bytes array which contains the actual payload to be sent from the sender to the receiver
- Tags - a Map of string, string for user define data

The KubeMQ core transport is based on gRPC, and the library is a wrapper around the client-side of gRPC complied protobuf hence leveraging the gRPC benefits and advantages.

Before any transactions to be performed with KubeMQ server, the Client should connect and dial KubeMQ server and obtain Client connection.

With the Client connection object, the user can perform all transactions to and from KubeMQ server.

A Client connection object is thread-safe and can be shared between all process needed to communicate with KubeMQ.

**IMPORTANT** - it's the user responsibility to close the Client connection when no further communication with KubeMQ is needed.

## Connection

Connecting to KubeMQ server can be done like that:
``` go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()
client, err := kubemq.NewClient(ctx,
kubemq.WithAddress("localhost", 50000),
kubemq.WithClientId("test-event-client-id"))
if err != nil {
   log.Fatal(err)
}
defer Client.Close()
```
List of connection options:

- WithAddress - set host and port address of KubeMQ server
- WithCredentials - set secured TLS credentials from the input certificate file for Client.
- WithToken - set KubeMQ token to be used for KubeMQ connection - not mandatory, only if enforced by the KubeMQ server
- WithClientId - set client id to be used in all functions call with this Client - mandatory
- WithReceiveBufferSize - set length of the buffered channel to be set in all subscriptions
- WithDefaultChannel - set default channel for any outbound requests
- WithDefaultCacheTTL - set default cache time to live for any query requests with any CacheKey set value
- WithTransportType - set client transport type, currently gRPC or Rest

An example of gRPC based connection:

``` go
    sender, err := kubemq.NewClient(ctx, 
   kubemq.WithAddress("localhost", 50000),
   kubemq.WithClientId("client-id"),
   kubemq.WithTransportType(kubemq.TransportTypeGRPC))
   if err != nil {
      log.Fatal(err)
   }
   defer sender.Close()
```
An example for gRPC based connection:

``` go
    sender, err := kubemq.NewClient(ctx, 
   kubemq.WithAddress("localhost", 50000),
   kubemq.WithClientId("client-id"),
   kubemq.WithTransportType(kubemq.TransportTypeGRPC))
   if err != nil {
      log.Fatal(err)
   }
   defer sender.Close()
```


An example of rest based connection:

``` go
    sender, err := kubemq.NewClient(ctx, 
   kubemq.WithUri("http://localhost:9090),
   kubemq.WithClientId("client-id"),
   kubemq.WithTransportType(kubemq.TransportTypeRest))
   if err != nil {
      log.Fatal(err)
   }
   defer sender.Close()
```
## Examples
Please visit our extensive [examples](https://github.com/kubemq-io/kubemq-go/tree/master/examples) folder
Please find usage examples on the examples folders.
## Queues

### Core features

KubeMQ supports distributed durable FIFO based queues with the following core features:

- **Exactly One Delivery** - Only one message guarantee will deliver to the subscriber
- **Single and Batch Messages Send and Receive** - Single and multiple messages in one call
- **RPC and Stream Flows** - RPC flow allows an insert and pulls messages in one call. Stream flow allows single message consuming in a transactional way
- **Message Policy** - Each message can be configured with expiration and delay timers. Also, each message can specify a dead-letter queue for un-processed messages attempts
- **Long Polling** - Consumers can wait until a message available in the queue to consume
- **Peak Messages** - Consumers can peek into a queue without removing them from the queue
- **Ack All Queue Messages** - Any client can mark all the messages in a queue as discarded and will not be available anymore to consume
- **Visibility timers** - Consumers can pull a message from the queue and set a timer which will cause the message not be visible to other consumers. This timer can be extended as needed.
- **Resend Messages** - Consumers can send back a message they pulled to a new queue or send a modified message to the same queue for further processing.

### Send Message to a Queue

```go
sendResult, err := client.NewQueueMessage().
      SetChannel(channel).
      SetBody([]byte("some-simple_queue-queue-message")).
      Send(ctx)
   if err != nil {
      log.Fatal(err)
   }
```

### Send Message to a Queue with Expiration

```go
    sendResult, err := client.NewQueueMessage().
   SetChannel(channel).
   SetBody([]byte("some-simple_queue-queue-message")).
   // message will expire within 20 seconds if will not consumed
    SetPolicyExpirationSeconds(20).
   Send(ctx)
   if err != nil {
      log.Fatal(err)
   }
```


### Send Message to a Queue with Delay

```go
    sendResult, err := client.NewQueueMessage().
   SetChannel(channel).
   SetBody([]byte("some-simple_queue-queue-message")).
   // message will be available in the queue in 5 seconds from sending
    SetPolicyDelaySeconds(5).
   Send(ctx)
   if err != nil {
      log.Fatal(err)
   }
```


### Send Message to a Queue with Dead-letter Queue

```go
    sendResult, err := client.NewQueueMessage().
   SetChannel(channel).
   SetBody([]byte("some-simple_queue-queue-message")).
   // setting 3 times for un-acked message will re-deliver the message to "DeadLetterQueue"
    SetPolicyMaxReceiveCount(3).
   SetPolicyMaxReceiveQueue("DeadLetterQueue").
   Send(ctx)
   if err != nil {
      log.Fatal(err)
   }
```

### Send Batch Messages

```go
   batch:=client.NewQueueMessages()
   for i:=0; i<10 ; i++  {
      batch.Add(client.NewQueueMessage().
         SetChannel(channel).SetBody([]byte(fmt.Sprintf("Batch Message %d",i))))
   }
   batchResult,err:= batch.Send(ctx)
   if err != nil {
      log.Fatal(err)
   }
   for _, sendResult := range batchResult {
      log.Printf("Send to Queue Result: MessageID:%s,Sent At: %s\n", sendResult.MessageID,time.Unix(0,sendResult.SentAt).String())
   }
```

### Receive Messages from a Queue

```go
   receiveResult,err:= client.NewReceiveQueueMessagesRequest().
      SetChannel(channel).
      SetMaxNumberOfMessages(10).
      SetWaitTimeSeconds(1).
      Send(ctx)
   if err != nil {
      log.Fatal(err)
   }
   log.Printf("Received %d Messages:\n",receiveResult.MessagesReceived)
   for _, msg := range receiveResult.Messages {
      log.Printf("MessageID: %s, Body: %s",msg.Id,string(msg.Body))
   }
```


### Peak Messages from a Queue

```go
   receiveResult,err:= client.NewReceiveQueueMessagesRequest().
      SetChannel(channel).
      SetMaxNumberOfMessages(10).
      SetWaitTimeSeconds(1).
      SetIsPeak(true).
      Send(ctx)
   if err != nil {
      log.Fatal(err)
   }
   log.Printf("Received %d Messages:\n",receiveResult.MessagesReceived)
   for _, msg := range receiveResult.Messages {
      log.Printf("MessageID: %s, Body: %s",msg.Id,string(msg.Body))
   }
```


### Ack All Messages In a Queue

```go
   receiveResult, err := ackClient.NewAckAllQueueMessagesRequest().
      SetChannel(channel).
      SetWaitTimeSeconds(2).
      Send(ctx)
   if err != nil {
      return
   }
   log.Printf("ack Messages: %d completed\n", receiveResult.AffectedMessages)
```

### Transactional Queue - Ack

```go
   stream := receiver.NewStreamQueueMessage().SetChannel(channel)
   // get message from the queue with visibility of 10 seconds and wait timeout of 10 seconds
   msg, err := stream.Next(ctx, 10, 10)
   if err != nil {
      log.Fatal(err)
   }
   log.Printf("MessageID: %s, Body: %s", msg.Id, string(msg.Body))
   log.Println("doing some work.....")
   time.Sleep(time.Second)
   // ack the current message
   log.Println("done, ack the message")
   err = msg.Ack()
   if err != nil {
      log.Fatal(err)
   }

   log.Println("checking for next message")
   msg, err = stream.Next(ctx, 10, 1)
   if err != nil {
      log.Println(err.Error())
   }
   if msg == nil {
      log.Println("no new message in the queue")
   }
```

### Transactional Queue - Reject

```go
   stream := receiver.NewStreamQueueMessage().SetChannel(channel)
   // get message from the queue with visibility of 10 seconds and wait timeout of 10 seconds
   msg, err := stream.Next(ctx, 10, 10)
   if err != nil {
      log.Fatal(err)
   }
   log.Printf("MessageID: %s, Body: %s", msg.Id, string(msg.Body))
   log.Println("reject message")
   err = msg.Reject()
   if err != nil {
      log.Fatal(err)
   }

```

### Transactional Queue - Extend Visibility

```go
   // get message from the queue
   msg, err := stream.Next(ctx, 5, 10)
   if err != nil {
      log.Fatal(err)
   }
   log.Printf("MessageID: %s, Body: %s", msg.Id, string(msg.Body))
   log.Println("work for 1 seconds")
   time.Sleep(1000 * time.Millisecond)
   log.Println("need more time to process, extend visibility for more 3 seconds")
   err = msg.ExtendVisibility(3)
   if err != nil {
      log.Fatal(err)
   }
   log.Println("approved. work for 2.5 seconds")
   time.Sleep(2500 * time.Millisecond)
   log.Println("work done.... ack the message")
   err = msg.Ack()
   if err != nil {
      log.Fatal(err)
   }
   log.Println("ack done")
```

### Transactional Queue - Resend to New Queue

```go
   stream := receiverA.NewStreamQueueMessage().SetChannel(channel)
   // get message from the queue
   msg, err := stream.Next(ctx, 5, 10)
   if err != nil {
      log.Fatal(err)
   }
   log.Printf("MessageID: %s, Body: %s", msg.Id, string(msg.Body))
   log.Println("resend to new queue")

   err = msg.Resend("new-queue")
   if err != nil {
      log.Fatal(err)
   }
   log.Println("done")
```


### Transactional Queue - Resend Modified Message

```go
    stream := receiver1.NewStreamQueueMessage().SetChannel("receiverA")
   // get message from the queue
   msg, err := stream.Next(ctx, 3, 5)
   if err != nil {
   log.Println("No new messages for ReceiverA")
      return
   }
   log.Printf("Queue: ReceiverA,MessageID: %s, Body: %s,Seq: %d - send to queue receiverB", msg.Id, string(msg.Body), msg.Attributes.Sequence)
   msg.SetChannel("receiverB")
   msg.SetMetadata("new metadata")
   err = stream.ResendWithNewMessage(msg)
   if err != nil {
         log.Fatal(err)
   }
```

## Events
### Sending Events
#### Single Event
``` go
err := client.E().
      SetId("some-id").
      SetChannel(channel).
      SetMetadata("some-metadata").
      SetBody([]byte("hello kubemq - sending single event")).
      Send(ctx)
if err != nil {
   log.Fatal(err)
}
```
#### Stream Events
``` go
eventStreamCh := make(chan *kubemq.Event, 1)
errStreamCh := make(chan error, 1)
go client.StreamEvents(ctx, eventStreamCh, errStreamCh)
event := client.E().SetId("some-event-id").
   SetChannel("some_channel").
   SetMetadata("some-metadata").
   SetBody([]byte("hello kubemq - sending stream event"))
for {
   select {
   case err := <-errStreamCh:
      log.Println(err)
      return
   case eventStreamCh <- event:
      return
   }
}
```
### Receiving Events
First you should subscribe to Events and get a channel:
``` go
channelName := "testing_event_channel"
errCh := make(chan error)
eventsCh, err := client.SubscribeToEvents(ctx, channelName, "", errCh)
if err != nil {
   log.Fatal(err)
}
```
Then you can loop over the channel of events:
``` go
for {
   select {
   case err := <-errCh:
      log.Fatal(err)
   case event := <-eventsCh:
      log.Printf("Event Received:\nEventID: %s\nChannel: %s\nMetadata: %s\nBody: %s\n", event.Id, event.Channel, event.Metadata, event.Body)
   }
}
```

## Events Store
### Sending Events Store
#### Single Event to Store
``` go
//sending 10 single events to store
for i := 0; i < 10; i++ {
   result, err := client.ES().
       SetId(fmt.Sprintf("event-store-%d", i)).
      SetChannel(channelName).
      SetMetadata("some-metadata").
      SetBody([]byte("hello kubemq - sending single event to store")).
      Send(ctx)
   if err != nil {
         log.Fatal(err)
   }
   log.Printf("Sending event #%d: Result: %t", i, result.Sent)
}
```
#### Stream Events Store
``` go
// sending addtional events to store
eventsStoreStreamCh := make(chan *kubemq.EventStore, 1)
eventsStoreSResultCh := make(chan *kubemq.EventStoreResult, 1)
errStreamCh := make(chan error, 1)
go client.StreamEventsStore(ctx, eventsStoreStreamCh, eventsStoreSResultCh, errStreamCh)
for i := 0; i < 10; i++ {
    event := client.ES().
    SetId(fmt.Sprintf("event-store-%d", i)).
    SetChannel(channelName).
    SetMetadata("some-metadata").
    SetBody([]byte("hello kubemq - sending stream event to store"))
    eventsStoreStreamCh <- event
    select {
        case err := <-errStreamCh:
          log.Println(err)
          return
          case result := <-eventsStoreSResultCh:
             log.Printf("Sending event #%d: Result: %t", i, result.Sent)
      }
}
```
### Receiving Events Store
First you should subscribe to Events Store and get a channel:
``` go
eventsCh, err := client.SubscribeToEventsStore(ctx, channelName, "", errCh, kubemq.StartFromFirstEvent())
if err != nil {
   log.Fatal(err)
 }
  
```
#### Subscription Options
KubeMQ supports six types of subscriptions:
- StartFromNewEvents - start event store subscription with only new events
- StartFromFirstEvent - replay all the stored events from the first available sequence and continue stream new events from this point
- StartFromLastEvent - replay the last event and continue stream new events from this point
- StartFromSequence - replay events from specific event sequence number and continue stream new events from this point
- StartFromTime - replay events from specific time continue stream new events from this point
- StartFromTimeDelta - replay events from specific current time - delta duration in seconds, continue stream new events from this point

Then you can loop over the channel of events:
``` go
for {
   select {
   case err := <-errCh:
      log.Fatal(err)
   case event := <-eventsCh:
      log.Printf("Receive EventStore\nSequence: %d\nTime: %s\nBody: %s\n", event.Sequence, event.Timestamp, event.Body)
   }
}
```

## Commands
### Concept
Commands implement synchronous messaging pattern which the sender send a request and wait for a specific amount of time to get a response.

The response can be successful or not. This is the responsibility of the responder to return with the result of the command within the time the sender set in the request.

### Sending Command Requests
In this example, the responder should send his response withing one second. Otherwise, an error will be return as a timeout.
``` go
response, err := client.C().
   SetId("some-command-id").
   SetChannel(channelName).
   SetMetadata("some-metadata").
   SetBody([]byte("hello kubemq - sending command, please reply")).
   SetTimeout(time.Second).
   Send(ctx)
if err != nil {
   log.Fatal(err)
}
```

### Receiving Commands Requests
First get a channel of commands:
``` go
errCh := make(chan error)
commandsCh, err := client.SubscribeToCommands(ctx, channelName, "", errCh)
if err != nil {
      log.Fatal(err)
    }
```
Then a loop over the channel will get the requests from the senders.
``` go
for {
   select {
   case err := <-errCh:
      log.Fatal(err)
        return
   case command := <-commandsCh:
      log.Printf("Command Received:\nId %s\nChannel: %s\nMetadata: %s\nBody: %s\n", command.Id, command.Channel, command.Metadata, command.Body)
   case <-ctx.Done():
      return
   }
}
```

### Sending a Command Response
When sending a response, there are two essential things to remember:
- Set the relevant requestId which you respond to
- Set the ResponseTo string to the value of the request ResponseTo field

``` go
err := client.R().
    SetRequestId(command.Id).
   SetResponseTo(command.ResponseTo).
   SetExecutedAt(time.Now()).
   Send(ctx)
if err != nil {
   log.Fatal(err)
}
```

## Queries
### Concept
Queries implement synchronous messaging pattern which the sender send a request and wait for a specific amount of time to get a response.

The response must include metadata or body together with an indication of successful or not operation. This is the responsibility of the responder to return with the result of the query within the time the sender set in the request.

### Sending Query Requests
In this example, the responder should send his response withing one second. Otherwise, an error will be return as a timeout.
``` go
response, err := client.Q().
    SetId("some-query-id").
    SetChannel(channel).
   SetMetadata("some-metadata").
   SetBody([]byte("hello kubemq - sending a query, please reply")).
   SetTimeout(time.Second).
   Send(ctx)
if err != nil {
   log.Fatal(err)
}
```

### Receiving Query Requests
First get a channel of queries:
``` go
errCh := make(chan error)
queriesCh, err := client.SubscribeToQueries(ctx, channelName, "", errCh)
if err != nil {
   log.Fatal(err)
}
```
Then a loop over the channel will get the requests from the senders.
``` go
for {
   select {
   case err := <-errCh:
      log.Fatal(err)
      return
   case query := <-queriesCh:
      log.Printf("Query Received:\nId %s\nChannel: %s\nMetadata: %s\nBody: %s\n", query.Id, query.Channel, query.Metadata, query.Body)
   case <-ctx.Done():
      return
       }
}
```

### Sending a Query Response
When sending a response, there are two essential things to remember:
- Set the relevant requestId which you respond to
- Set the ResponseTo string to the value of the request ResponseTo field

``` go
err := client.R().
    SetRequestId(query.Id).
   SetResponseTo(query.ResponseTo).
   SetExecutedAt(time.Now()).
   SetMetadata("this is a response").
   SetBody([]byte("got your query, you are good to go")).
   Send(ctx)
   
if err != nil {
   log.Fatal(err)
}
```
find usage examples on the examples folders.
