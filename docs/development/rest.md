---
title: REST
lang: en-US
description: 'REST Python SDK reference'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','rest']
---
# REST

The KubeMQ server API provides a simple interface for all messaging patterns.

RPC functions are supported by REST calls, and Stream functions are supported by Websockets calls.
## Table of Content
[[toc]]
::: tip Postman
You can view REST documentation in [Postman](https://postman.kubemq.io)

Or run it on your local Postman app:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c3f4630fbbd5b9684049#?env%5Bkubemq-playground%5D=W3sia2V5IjoiaG9zdCIsInZhbHVlIjoiaHR0cHM6Ly9wbGF5Z3JvdW5kLmt1YmVtcS5pbyIsImRlc2NyaXB0aW9uIjoiIiwiZW5hYmxlZCI6dHJ1ZX1d)
:::

## Queue

### Send Message
Send a message to a queue.

Send Message endpoint is a `POST` function to `{{host}}/queue/send` where `host` is the KubeMQ REST interface address.
`POST` Send message JSON structure:
``` json
{
         "Id":"",
         "ClientId":"send-message-client-id",
         "Channel":"testing_queue_channel",
         "Metadata":"",
         "Body":"QmF0Y2ggTWVzc2FnZSAw",
         "Tags":{
            "message":"0"
         },
         "Attributes":null,
         "Policy":{
            "ExpirationSeconds":0,
            "DelaySeconds":0,
            "MaxReceiveCount":0,
            "MaxReceiveQueue":""
         }
}
```
Where:

| Field                     | Type              | Required | Description                                                                                                                                  |
|:--------------------------|:------------------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| Id                        | string            | No       | Message id can set by the sender if no Id is set KubeMQ will generate a UUID type value for Message Id                                      |
| ClientID                  | string            | Yes      | Sender Client ID                                                                                                                             |
| Channel                   | string            | Yes      | Channel sender address                                                                                                                       |
| Metadata                  | string            | No       | Sender-defined message metadata data                                                                                                         |
| Body                      | string/base64     | Yes      | Sender-defined message body data                                                                                                             |
| Tags                      | map string, string | No       | Set message Tags                                                                                                                             |
| Policy->ExpirationSeconds | integer           | No       | Set expiration seconds which after this time the message will not be available to consume                                                    |
| Policy->DelaySeconds      | integer           | No       | Set delay seconds which before this time the message will not be available to consume                                                        |
| Policy->MaxReceiveCount   | integer           | No       | Set max receiving count which set how many times the message will be consumed without ack before re-route to a dead-letter queue or discarded |
| Policy->MaxReceiveQueue   | string            | No       | Set max receiving dead-letter queue name |

As a Response from `POST` message:

``` json
{
   "is_error": false,
   "message": "OK",
   "data": {
      "MessageID": "eefd585e-3037-47d4-a59b-9655bd5e6d43",
      "SentAt": 1563372173632454300,
      "ExpirationAt": 1563372183632454300,
      "DelayedTo": 1563372178632454300
   }
}
```
Note: all times in the return message are unix time nano seconds



### Send Batch Messages
Send a batch of messages to a queue.

Send Message endpoint is a `POST` function to `{{host}}/queue/send_batch` where `host` is the KubeMQ REST interface address.
`POST` Send message JSON structure:
``` json
{
   "BatchID": "some-batch-id",
   "Messages":[
      {
         "Id":"",
         "ClientId":"send-batch-client-id",
         "Channel":"testing_queue_channel",
         "Metadata":"",
         "Body":"QmF0Y2ggTWVzc2FnZSAw",
         "Tags":{
            "message":"0"
         },
         "Attributes":null,
         "Policy":{
            "ExpirationSeconds":0,
            "DelaySeconds":0,
            "MaxReceiveCount":0,
            "MaxReceiveQueue":""
         }
      },
      {
         "Id":"",
         "ClientId":"send-batch-client-id",
         "Channel":"testing_queue_channel",
         "Metadata":"",
         "Body":"QmF0Y2ggTWVzc2FnZSAx",
         "Tags":{
            "message":"1"
         },
         "Attributes":null,
         "Policy":{
            "ExpirationSeconds":0,
            "DelaySeconds":0,
            "MaxReceiveCount":0,
            "MaxReceiveQueue":""
         }
      },
      {
         "Id":"",
         "ClientId":"send-batch-client-id",
         "Channel":"testing_queue_channel",
         "Metadata":"",
         "Body":"QmF0Y2ggTWVzc2FnZSAy",
         "Tags":{
            "message":"2"
         },
         "Attributes":null,
         "Policy":{
            "ExpirationSeconds":0,
            "DelaySeconds":0,
            "MaxReceiveCount":0,
            "MaxReceiveQueue":""
         }
      },
      {
         "Id":"",
         "ClientId":"send-batch-client-id",
         "Channel":"testing_queue_channel",
         "Metadata":"",
         "Body":"QmF0Y2ggTWVzc2FnZSAz",
         "Tags":{
            "message":"3"
         },
         "Attributes":null,
         "Policy":{
            "ExpirationSeconds":0,
            "DelaySeconds":0,
            "MaxReceiveCount":0,
            "MaxReceiveQueue":""
         }
      },
      {
         "Id":"",
         "ClientId":"send-batch-client-id",
         "Channel":"testing_queue_channel",
         "Metadata":"",
         "Body":"QmF0Y2ggTWVzc2FnZSA0",
         "Tags":{
            "message":"4"
         },
         "Attributes":null,
         "Policy":{
            "ExpirationSeconds":0,
            "DelaySeconds":0,
            "MaxReceiveCount":0,
            "MaxReceiveQueue":""
         }
      }
   ]
}
```
Where:

| Field                     | Type              | Required | Description                                                                                                                                  |
|:--------------------------|:------------------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| BatchID                        | string            | No       | Batch Message id can set by the sender if no Id is set KubeMQ will generate a UUID type value for Message Id                                      |
| Messages                  | array of queue messages           | Yes      | contains all the messages to be send                                                                                      |

As a Response from `POST` message:

``` json
{
   "is_error": false,
   "message": "OK",
   "data": {
      "BatchID": "some-batch-id",
      "Results": [
          {
              "MessageID": "e9a5b4cd-0c75-456a-ae62-fe7195ddd86f",
              "SentAt": 1563372173632454300,
              "ExpirationAt": 1563372183632454300,
              "DelayedTo": 1563372178632454300
          },
          {
              "MessageID": "eefd585e-3037-47d4-a59b-9655bd5e6d43",
              "SentAt": 1563372173632454300,
              "ExpirationAt": 1563372183632454300,
              "DelayedTo": 1563372178632454300
          },
          {
              "MessageID": "d36e0ccd-58e2-4562-b7bb-2c4eb3ecb580",
              "SentAt": 1563372173632454300,
              "ExpirationAt": 1563372183632454300,
              "DelayedTo": 1563372178632454300
          },
          {
              "MessageID": "3542b63c-df40-4ff4-bc22-198d6208a147",
              "SentAt": 1563372173632454300,
              "ExpirationAt": 1563372183632454300,
              "DelayedTo": 1563372178632454300
          },
            {
              "MessageID": "3e08a521-2814-44b1-bca0-d3af90deb315",
              "SentAt": 1563372173632454300,
              "ExpirationAt": 1563372183632454300,
              "DelayedTo": 1563372178632454300
          }
      ]                
   }
}
```
Note: all times in the return message are unix time nano seconds


### Receive Messages
Send a Receive Message request to retrieve batch of messages from a queue.

Send Message endpoint is a `POST` function to `{{host}}/queue/receive` where `host` is the KubeMQ REST interface address.
`POST` Send message JSON structure:

``` json
{
   "RequestID":"some-request-id",
   "ClientID":"receive-message-client-id",
   "Channel":"testing_queue_channel",
   "MaxNumberOfMessages":10,
   "WaitTimeSeconds":5,
   "IsPeak":false
}
```
Where:

| Field           | Type          | Required | Description                                                                                                   |
|:----------------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string        | Yes      | request id can set by the sender, if no RequestID is set KubeMQ will generate a UUID type value for RequestID |
| ClientID        | string        | Yes      | Sender Client ID                                                                                              |
| Channel         | string        | Yes      | Channel sender address                                                                                        |
| MaxNumberOfMessages        | integer        | Yes       | Set how many messages to pull from the queue |
| WaitTimeSeconds            | integer | Yes      | Set  how many seconds to wait for the messages to be pulled                                                                                |
| IsPeak         | bool           | No      | Set to false as we pulling out the messages from the queue                                                       |

As a Response from `POST` message:

``` json
{
   "is_error": false,
   "message": "OK",
   "data": {
      "RequestID": "some-request-id",
      "Messages": [
         {
            "MessageID": "3205da1e-4dbf-4f6f-9b77-79d9dd881017",
            "ClientID": "send-batch-client-id",
            "Channel": "testing_queue_channel",
            "Body": "QmF0Y2ggTWVzc2FnZSAw",
            "Tags": {
               "message": "0"
            },
            "Attributes": {
               "Timestamp": 1563372507251528700,
               "Sequence": 327,
               "MD5OfBody": "bd5fbd8ea1ffc4271391db089e53319b",
               "ReceiveCount": 1
            },
            "Policy": {
               "MaxReceiveCount": 16
            }
         },
         {
            "MessageID": "e9a5b4cd-0c75-456a-ae62-fe7195ddd86f",
            "ClientID": "send-batch-client-id",
            "Channel": "testing_queue_channel",
            "Body": "QmF0Y2ggTWVzc2FnZSAx",
            "Tags": {
               "message": "1"
            },
            "Attributes": {
               "Timestamp": 1563372507255537800,
               "Sequence": 328,
               "MD5OfBody": "98f68499eb379d773e0e8b5deeed6eb7",
               "ReceiveCount": 1
            },
            "Policy": {
               "MaxReceiveCount": 16
            }
         },
         {
            "MessageID": "cc5e8e76-6756-4872-ad73-e78dc439b8b9",
            "ClientID": "send-batch-client-id",
            "Channel": "testing_queue_channel",
            "Body": "QmF0Y2ggTWVzc2FnZSAy",
            "Tags": {
               "message": "2"
            },
            "Attributes": {
               "Timestamp": 1563372507257527500,
               "Sequence": 329,
               "MD5OfBody": "467bd369acea7c452a6ef23d6d33b624",
               "ReceiveCount": 1
            },
            "Policy": {
               "MaxReceiveCount": 16
            }
         },
         {
            "MessageID": "d36e0ccd-58e2-4562-b7bb-2c4eb3ecb580",
            "ClientID": "send-batch-client-id",
            "Channel": "testing_queue_channel",
            "Body": "QmF0Y2ggTWVzc2FnZSAz",
            "Tags": {
               "message": "3"
            },
            "Attributes": {
               "Timestamp": 1563372507259528100,
               "Sequence": 330,
               "MD5OfBody": "523ac3e2930cda656c78ffbeb6f07ca8",
               "ReceiveCount": 1
            },
            "Policy": {
               "MaxReceiveCount": 16
            }
         }
      ],
      "MessagesReceived": 4,
      "MessagesExpired": 1,
   }
}
```
Where Data field

| Field           | Type          |  Description                                                                                                   |
|:----------------|:--------------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string        | Get the id of the request|
| Messages        | array of queue messages        |  contains an array of pulled messages  |
| MessagesReceived         | integer        |  how many valid messages pulled from the queue                                                                     |
| MessagesExpired         | integer        |  how many expired messages pulled from the queue                                                                     |


### Peak Messages
Send a Receive Message request to peek batch of messages into the queue.

Send Message endpoint is a `POST` function to `{{host}}/queue/receive` where `host` is the KubeMQ REST interface address.
`POST` Send message JSON structure:

``` json
{
   "RequestID":"some-request-id",
   "ClientID":"receive-message-client-id",
   "Channel":"testing_queue_channel",
   "MaxNumberOfMessages":10,
   "WaitTimeSeconds":5,
   "IsPeak":true
}
```
Where:

| Field           | Type          | Required | Description                                                                                                   |
|:----------------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string        | Yes      | request id can set by the sender, if no RequestID is set KubeMQ will generate a UUID type value for RequestID |
| ClientID        | string        | Yes      | Sender Client ID                                                                                              |
| Channel         | string        | Yes      | Channel sender address                                                                                        |
| MaxNumberOfMessages        | integer        | Yes       | Set how many messages to peek from the queue |
| WaitTimeSeconds            | integer | Yes      | Set  how many seconds to wait for the messages to be peeked                                                                                |
| IsPeak         | bool           | No      | Set to true as we peeking the messages into the queue                                                       |

As a Response from `POST` message:

``` json
{
   "is_error": false,
   "message": "OK",
   "data": {
      "RequestID": "some-request-id",
      "Messages": [
         {
            "MessageID": "3205da1e-4dbf-4f6f-9b77-79d9dd881017",
            "ClientID": "send-batch-client-id",
            "Channel": "testing_queue_channel",
            "Body": "QmF0Y2ggTWVzc2FnZSAw",
            "Tags": {
               "message": "0"
            },
            "Attributes": {
               "Timestamp": 1563372507251528700,
               "Sequence": 327,
               "MD5OfBody": "bd5fbd8ea1ffc4271391db089e53319b",
               "ReceiveCount": 1
            },
            "Policy": {
               "MaxReceiveCount": 16
            }
         },
         {
            "MessageID": "e9a5b4cd-0c75-456a-ae62-fe7195ddd86f",
            "ClientID": "send-batch-client-id",
            "Channel": "testing_queue_channel",
            "Body": "QmF0Y2ggTWVzc2FnZSAx",
            "Tags": {
               "message": "1"
            },
            "Attributes": {
               "Timestamp": 1563372507255537800,
               "Sequence": 328,
               "MD5OfBody": "98f68499eb379d773e0e8b5deeed6eb7",
               "ReceiveCount": 1
            },
            "Policy": {
               "MaxReceiveCount": 16
            }
         },
         {
            "MessageID": "cc5e8e76-6756-4872-ad73-e78dc439b8b9",
            "ClientID": "send-batch-client-id",
            "Channel": "testing_queue_channel",
            "Body": "QmF0Y2ggTWVzc2FnZSAy",
            "Tags": {
               "message": "2"
            },
            "Attributes": {
               "Timestamp": 1563372507257527500,
               "Sequence": 329,
               "MD5OfBody": "467bd369acea7c452a6ef23d6d33b624",
               "ReceiveCount": 1
            },
            "Policy": {
               "MaxReceiveCount": 16
            }
         },
         {
            "MessageID": "d36e0ccd-58e2-4562-b7bb-2c4eb3ecb580",
            "ClientID": "send-batch-client-id",
            "Channel": "testing_queue_channel",
            "Body": "QmF0Y2ggTWVzc2FnZSAz",
            "Tags": {
               "message": "3"
            },
            "Attributes": {
               "Timestamp": 1563372507259528100,
               "Sequence": 330,
               "MD5OfBody": "523ac3e2930cda656c78ffbeb6f07ca8",
               "ReceiveCount": 1
            },
            "Policy": {
               "MaxReceiveCount": 16
            }
         }
      ],
      "MessagesReceived": 4,
      "MessagesExpired": 1,
      "IsPeak": true
   }
}
```
Where Data field

| Field           | Type          |  Description                                                                                                   |
|:----------------|:--------------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string        | Get the id of the request|
| Messages        | array of queue messages        |  contains an array of pulled messages  |
| MessagesReceived         | integer        |  how many valid messages pulled from the queue                                                                     |
| MessagesExpired         | integer        |  how many expired messages pulled from the queue                                                                     |
| IsPeak         | bool        |  indicate peek request                                                                  |


### Ack All Messages
Send an Ack All Messages request to mark all available messages as taken (ack).

Send Message endpoint is a `POST` function to `{{host}}/queue/ack_all` where `host` is the KubeMQ REST interface address.
`POST` Send message JSON structure:

``` json
{
   "RequestID":"",
   "ClientID":"ack-all-message-client-id",
   "Channel":"testing_queue_channel",
   "WaitTimeSeconds":1
}
```
Where:

| Field           | Type    | Required | Description                                                                                                   |
|:----------------|:--------|:---------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string  | Yes      | request id can set by the sender, if no RequestID is set KubeMQ will generate a UUID type value for RequestID |
| ClientID        | string  | Yes      | Sender Client ID                                                                                              |
| Channel         | string  | Yes      | Channel sender address                                                                                        |
| WaitTimeSeconds | integer | Yes      | Set  how many seconds to wait for ack all the messages                                                        |


As a Response from `POST` message:

``` json
{
   "is_error": false,
   "message": "OK",
   "data": {
      "RequestID": "f20480d6-10ae-480d-8102-ed74cb46ee24",
      "AffectedMessages": 11
   }
}
```
Where Data field

| Field            | Type    | Description                                       |
|:-----------------|:--------|:--------------------------------------------------|
| RequestID        | string  | Get the id of the request                         |
| AffectedMessages | integer | how many messages were ack from the queue |

oint is a `POST` function to `{{host}}/queue/ack_all` where `host` is the KubeMQ REST interface address.
`POST` Send message JSON structure:

``` json
{
   "RequestID":"",
   "ClientID":"ack-all-message-client-id",
   "Channel":"testing_queue_channel",
   "WaitTimeSeconds":1
}
```
Where:

| Field           | Type    | Required | Description                                                                                                   |
|:----------------|:--------|:---------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string  | Yes      | request id can set by the sender, if no RequestID is set KubeMQ will generate a UUID type value for RequestID |
| ClientID        | string  | Yes      | Sender Client ID                                                                                              |
| Channel         | string  | Yes      | Channel sender address                                                                                        |
| WaitTimeSeconds | integer | Yes      | Set  how many seconds to wait for ack all the messages                                                        |


As a Response from `POST` message:

``` json
{
   "is_error": false,
   "message": "OK",
   "data": {
      "RequestID": "f20480d6-10ae-480d-8102-ed74cb46ee24",
      "AffectedMessages": 11
   }
}
```
Where Data field

| Field            | Type    | Description                                       |
|:-----------------|:--------|:--------------------------------------------------|
| RequestID        | string  | Get the id of the request                         |
| AffectedMessages | integer | how many messages were ack from the queue |


## Pub/Sub

### Send Event Message
Send Event call send an event message for Events pattern.

Send Event endpoint is a `POST` function to `{{host}}/send/event` where `host` is the KubeMQ REST interface address.

`POST` Event message JSON structure:
``` json
{
    "EventID": "1234-5678-90",
    "ClientID": "events-client-id",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
    "Store": false, 
    "Tags":{
            "message":"0"
         }
}
```
Where:

| Field    | Type          | Required | Description                                                                                             |
|:---------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------|
| EventID  | string        | No       | event id can set by the sender if no EventID is set KubeMQ will generate a UUID type value for EventID |
| ClientID | string        | Yes      | Sender Client ID                                                                                        |
| Channel  | string        | Yes      | Channel sender address                                                                                  |
| Metadata | string        | No       | Sender-defined event metadata data                                                                      |
| Body     | string/base64 | Yes      | Sender-defined event body data                                                                          |
| Store    | bool          | Yes      | Store=false send to Event pattern, Store=true send to Event Store pattern                               |
| Tags           | map string,string| No      | Set Event Tags|

As a Response from `POST` message:

``` json
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```

### Send EventStore Message
Send Event Store call send an event message for both Events and Events Store patterns.

Send Event endpoint is a `POST` function to `{{host}}/send/event` where `host` is the KubeMQ REST interface address.

`POST` Event message JSON structure:
``` json
{
    "EventID": "1234-5678-90",
    "ClientID": "events-client-id",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
    "Store": true,
     "Tags":{
            "message":"0"
         }
}
```
Where:

| Field    | Type          | Required | Description                                                                                             |
|:---------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------|
| EventID  | string        | No       | event id can set by the sender if no EventID is set KubeMQ will generate a UUID type value for EventID |
| ClientID | string        | Yes      | Sender Client ID                                                                                        |
| Channel  | string        | Yes      | Channel sender address                                                                                  |
| Metadata | string        | No       | Sender-defined event metadata data                                                                      |
| Body     | string/base64 | Yes      | Sender-defined event body data                                                                          |
| Store    | bool          | Yes      | Store=false send to Event pattern, Store=true send to Event Store pattern                               |
| Tags           | map string, string| No      | Set Event Store Tags|

As a Response from `POST` message:

``` json
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```

### Send Events Stream
Send Events Stream allows opening a bi-directional WebSocket connection and stream Event messages and receive Response messages.

Send Event endpoint is a `GET` function with websocket upgrade to `{{host}}/send/stream` where `host` is the KubeMQ REST interface address.

**NOTE:**  Since Postman does not support WebSocket upgrade function, only the GET function is provided.

After WebSocket upgrade, sending Event messages and receiving responses will use WebSocket Text format.

Event message JSON structure:
``` json
{
    "EventID": "1234-5678-90",
    "ClientID": "events-client-id",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
    "Store": false,
     "Tags":{
            "message":"0"
         }
    
}
```

Where:

| Field    | Type          | Required | Description                                                                                             |
|:---------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------|
| EventID  | string        | No       | event id can set by the sender if no EventID is set KubeMQ will generate a UUID type value for EventID |
| ClientID | string        | Yes      | Sender Client ID                                                                                        |
| Channel  | string        | Yes      | Channel sender address                                                                                  |
| Metadata | string        | No       | Sender-defined event metadata data                                                                      |
| Body     | string/base64 | Yes      | Sender-defined event body data                                                                          |
| Store    | bool          | Yes      | Store=false send to Event pattern, Store=true send to Event Store pattern                               |
| Tags           | map string,string| No      | Set Event / Event Store Tags|

The WebSocket will receive Response messages with this structure:

``` json
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```

### Subscribe to Events

Subscribe Events endpoint is a `GET` function with websocket upgrade to:

 `{{host}}/subscribe/events?client_id={{client_id}}&channel={{channel_name}}&group={{group_name}}&subscribe_type=events`

 Where request call parameters are:

| Field          | Type   | Required | Description                   |
|:---------------|:-------|:---------|:------------------------------|
| host           | string | Yes      | KubeMQ REST interface address |
| client_id      | string | Yes      | Sender Client ID              |
| channel        | string | Yes      | Subscribed channel            |
| group          | string | No       | Subscribed group              |
| subscribe_type | string | Yes      | `events`                      |

Event Receive messages format:
``` json
 {   
    "EventID": "1234-5678-90",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
    "Tags":{
            "message":"0"
         }
 }
```

Where:

| Field    | Type          | Description                                                                                             |
|:---------|:--------------|:--------------------------------------------------------------------------------------------------------|
| EventID  | string        | event id can set by the sender if no EventID is set KubeMQ will generate a UUID type value for EventID |
| Channel  | string        | Channel sender address                                                                                  |
| Metadata | string        | Sender metadata data                                                                                    |
| Body     | string/base64 | Sender body data                                                                                        |
| Tags           | map string,string|Event Sender Tags|


**NOTE:**

Since Postman does not support WebSocket upgrade function, only the GET function is provided.


### Subscribe to Events Store
Subscribe Events endpoint is a `GET` function with websocket upgrade to:

 `{{host}}/subscribe/events?client_id={{client_id}}&channel={{channel_name}}&group={{group_name}}&subscribe_type=events_store&events_store_type_data={{subscription_type}}&events_store_type_value={{subscription_value}}`

 Where request call parameters are:

| Field                   | Type   | Required | Description                       |
|:------------------------|:-------|:---------|:----------------------------------|
| host                    | string | Yes      | KubeMQ REST interface address     |
| client_id               | string | Yes      | Sender Client ID                  |
| channel                 | string | Yes      | Subscribed channel                |
| group                   | string | No       | Subscribed group                  |
| subscribe_type          | string | Yes      | `events_store`                    |
| events_store_type_data  | int    | Yes      | type of Events Store subscription |
| events_store_type_value | int64  | Yes/No   | Events Store subscription value   |

Where Events Store Type and Data here Events Store Values:


| Type Name        | Data | Value                                    |
|:-----------------|:-----|:-----------------------------------------|
| StartNewOnly     | 1    | N/A                                      |
| StartFromFirst   | 2    | N/A                                      |
| StartFromLast    | 3    | N/A                                      |
| StartAtSequence  | 4    | int>0, indicate sequence number required |
| StartAtTime      | 5    | int64 , unix time format                 |
| StartAtTimeDelta | 6    | int>0, indicate seconds                  |



Events Store Receive messages format:
``` json
 {   
    "EventID": "1234-5678-90",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
    "Timestamp":1545990840555899600,
    "Sequence":1,
     "Tags":{
            "message":"0"
         }
 }
```

Where:

| Field     | Type          | Description                                                                                             |
|:----------|:--------------|:--------------------------------------------------------------------------------------------------------|
| EventID   | string        | event id can set by the sender if no EventID is set KubeMQ will generate a UUID type value for EventID |
| Channel   | string        | Channel sender address                                                                                  |
| Metadata  | string        | Sender metadata data                                                                                    |
| Body      | string/base64 | Sender body data                                                                                        |
| Timestamp | int64         | Unix time format of message                                                                             |
| Sequence  | int           | Events Store message sequence number                                                                    |
| Tags           | map string, string| Event Store sender Tags|

**NOTE:**

Since Postman does not support WebSocket upgrade function, only the GET function is provided.

## RPC

### Send Command Request
Send Command RPC call send a command request in Commands pattern.

Send Command endpoint is a `POST` function to `{{host}}/send/request` where `host` is the KubeMQ REST interface address.

`POST` Command request JSON structure:
``` json
 {
       "RequestID": "a0060e6b-3a9a-4e75-8a69-6a8b6cbae176",
       "RequestTypeData":1, 
       "ClientID": "command-client-id",
       "Channel": "command-channel",
       "Metadata" :"command-metadata",
       "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
       "Timeout": 1000, 
       "Tags":{
            "message":"0"
         }
 }

```
Where:

| Field           | Type          | Required | Description                                                                                                   |
|:----------------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string        | Yes      | request id can set by the sender if no RequestID is set KubeMQ will generate a UUID type value for RequestID |
| RequestTypeData | int           | Yes      | Command=1                                                                                                     |
| ClientID        | string        | Yes      | Sender Client ID                                                                                              |
| Channel         | string        | Yes      | Channel sender address                                                                                        |
| Metadata        | string        | No       | Sender-defined event metadata data                                                                            |
| Body            | string/base64 | Yes      | Sender-defined event body data                                                                                |
| Timeout         | int           | Yes      | Set Command timeout for response                                                                              |
| Tags           | map string,string| No      | Set Command Tags|


A successful Command Response from `POST` request:

``` json
{
    "is_error": false,
    "message": "OK",
    "data": {
        "ClientID": "responder-client-id",
        "RequestID": "a0060e6b-3a9a-4e75-8a69-6a8b6cbae176",
        "Timestamp": 1546084257,
        "Executed": true,
        "Error": ""
    }
}
```
Where returned data object :

| Field     | Type   | Description                                                  |
|:----------|:-------|:-------------------------------------------------------------|
| ClientID  | string | Responder Client ID                                          |
| RequestID | string | Command sender Request ID                                    |
| Timestamp | int64  | Unix time of Response                                        |
| Executed  | bool   | true=command executed, false= error during command execution |
| Error     | string | if Executed=false, Error message                             |


A timeout error on unsuccessful Command Response from `POST` request:

``` json
{
    "is_error": true,
    "message": "Error 301: timeout for request message",
    "data": null
}
```
### Send Query Request
Send Query RPC call send a query request in Query pattern.

Send Query endpoint is a `POST` function to `{{host}}/send/request` where `host` is the KubeMQ REST interface address.

`POST` Query request JSON structure:
``` json
{
       "RequestID": "a0060e6b-3a9a-4e75-8a69-6a8b6cbae176",
       "RequestTypeData":2, 
       "ClientID": "query-client-id",
       "Channel": "query-channel",
       "Metadata" :"query-metadata",
       "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
       "Timeout": 1000,
       "CacheKey": "query-cache-key",
   "CacheTTL":10000,
   "Tags":{
            "message":"0"
         }
 }

```
Where:

| Field           | Type          | Required               | Description                                                                                                   |
|:----------------|:--------------|:-----------------------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string        | Yes                    | request id can set by the sender if no RequestID is set KubeMQ will generate a UUID type value for RequestID |
| RequestTypeData | int           | Yes                    | Query = 2                                                                                                     |
| ClientID        | string        | Yes                    | Sender Client ID                                                                                              |
| Channel         | string        | Yes                    | Channel sender address                                                                                        |
| Metadata        | string        | No                     | Sender-defined event metadata data                                                                            |
| Body            | string/base64 | Yes                    | Sender-defined event body data                                                                                |
| Timeout         | int           | Yes                    | Set Query timeout for response                                                                              |
| CacheKey        | string        | No                     | Set Cache key to retrieve / store response                                                                    |
| CacheTTL        | int           | Yes (if Cache_key set) | Set Cache time to live in seconds                                                                             |
| Tags           | map string,string| No      | Set Query Tags|


A successful Query Response from `POST` request:

``` json
{
    "is_error": false,
    "message": "OK",
    "data": {
        "ClientID": "responder-client-id",
        "RequestID": "a0060e6b-3a9a-4e75-8a69-6a8b6cbae176",
        "Metadata" :"response-query-metadata",
        "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
        "CacheHit": false,
        "Timestamp": 1546090739,
        "Executed": true,
        "Error": "",
        "Tags":{
            "message":"0"
         }
        
    }
}
```
Where returned data object :

| Field     | Type          | Description                                                                        |
|:----------|:--------------|:-----------------------------------------------------------------------------------|
| ClientID  | string        | Responder Client ID                                                                |
| RequestID | string        | Query sender Request ID                                                            |
| Metadata  | string        | Response metadata                                                                  |
| Body      | string/base64 | Response body                                                                      |
| CacheHit  | bool          | true= Response retrieved from cache, false= Response from a receiver or cache miss |
| Timestamp | int64         | Unix time of Response                                                              |
| Executed  | bool          | true=query executed, false= error during query execution                           |
| Error     | string        | if Executed=false, Error message                                                   |
| Tags           | map string,string|  Get Query Response Tags|


A timeout error on unsuccessful Command Response from `POST` request:

``` json
{
    "is_error": true,
    "message": "Error 301: timeout for request message",
    "data": null
}
```
### Subscribe to Commands
Subscribe Commands endpoint is a `GET` function with websocket upgrade to:

 `{{host}}/subscribe/requests?client_id={{client_id}}&channel={{channel_name}}&group={{group_name}}&subscribe_type=commands`

 Where request call parameters are:

| Field          | Type   | Required | Description                   |
|:---------------|:-------|:---------|:------------------------------|
| host           | string | Yes      | KubeMQ REST interface address |
| client_id      | string | Yes      | Sender Client ID              |
| channel        | string | Yes      | Subscribed channel            |
| group          | string | No       | Subscribed group              |
| subscribe_type | string | Yes      | `commands`                    |

Commands Requests format:
``` json
 {  
    "RequestID":"d43d3de0-4bfc-4cb8-9465-7359dc55cf31",
    "RequestTypeData":1,
    "ClientID":"command-client-id",
    "Channel":"command-channel",
    "Metadata":"command-metadata",
    "Body":"c29tZSBlbmNvZGVkIGJvZHk=",
    "ReplyChannel":"_INBOX.lmViYldo2SitpyU15UyK7M.lmViYldo2SitpyU15UyKFw",
     "Tags":{
            "message":"0"
         }
 }
```

Where:

| Field           | Type   | Description              |
|:----------------|:-------|:-------------------------|
| RequestID       | string | Command sender RequestID |
| RequestTypeData | string | Request Type = Command   |
| ClientID        | string | Command Sender Client ID |
| Metadata        | string | Command Sender metadata  |
| Body            | string | Command Sender body      |
| ReplyChannel    | string | Response channel address |
| Tags    | map string,string | Command sender Tags|

### Subscribe to Queries
Subscribe to Queries endpoint is a `GET` function with websocket upgrade to:

 `{{host}}/subscribe/requests?client_id={{client_id}}&channel={{channel_name}}&group={{group_name}}&subscribe_type=queries`

 Where request call parameters are:

| Field          | Type   | Required | Description                   |
|:---------------|:-------|:---------|:------------------------------|
| host           | string | Yes      | KubeMQ REST interface address |
| client_id      | string | Yes      | Sender Client ID              |
| channel        | string | Yes      | Subscribed channel            |
| group          | string | No       | Subscribed group              |
| subscribe_type | string | Yes      | `queries`                     |

Query Requests format:
``` json
 {  
    "RequestID":"d43d3de0-4bfc-4cb8-9465-7359dc55cf31",
    "RequestTypeData":2,
    "ClientID":"query-client-id",
    "Channel":"query-channel",
    "Metadata":"query-metadata",
    "Body":"c29tZSBlbmNvZGVkIGJvZHk=",
    "ReplyChannel":"_INBOX.lmViYldo2SitpyU15UyK7M.lmViYldo2SitpyU15UyKFw",
     "Tags":{
            "message":"0"
         }
 }
```

Where:

| Field           | Type   | Description              |
|:----------------|:-------|:-------------------------|
| RequestID       | string | Query sender RequestID   |
| RequestTypeData | string | Request Type = Command   |
| ClientID        | string | Query Sender Client ID   |
| Metadata        | string | Query Sender metadata    |
| Body            | string | Query Sender body        |
| ReplyChannel    | string | Response channel address |
| Tags    | map string,string | Query sender Tags|

### Send Response
Send Response RPC call send a Response to command/query requests in Command and Query patterns.

Send Response endpoint is a `POST` function to `{{host}}/send/response` where `host` is the KubeMQ REST interface address.

`POST` Response request JSON structure:
``` json
{
   "RequestID": "d43d3de0-4bfc-4cb8-9465-7359dc55cf31",
   "ClientID":"response-client-id",
   "ReplyChannel": "_INBOX.x8bxFotxDNG4c3zTp8scBQ.x8bxFotxDNG4c3zTp8scMq",
   "Metadata" :"response-metadat",
   "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
   "Executed": true,
   "Error":"",
    "Tags":{
            "message":"0"
         }
}

```
Where:

| Field        | Type          | Required | Description                                                 |
|:-------------|:--------------|:---------|:------------------------------------------------------------|
| RequestID    | string        | Yes      | Request ID of the Command/Query request                     |
| ClientID     | string        | Yes      | Response Sender Client ID                                   |
| ReplyChannel | string        | Yes      | Response Channel address                                    |
| Metadata     | string        | No       | Sender-defined event metadata data (Query only)             |
| Body         | string/base64 | No       | Sender-defined event body data (Query only)                 |
| Executed     | bool          | Yes      | Set Command / Query request execution result                |
| Error        | string        | No       | Set error message in case of failed Command / Query request |
| Tags           | map string,string| No      | Set Response Tags|

