
# REST API
KubeMQ server API provides simple interface for all messaging patterns.

RPC functions are supported by REST calls and Stream functions are supported by Websockets calls.
::: tip Postman
You can view REST documentation in [Postman](https://postman.kubemq.io)

Or run it on your local Postman app:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c3f4630fbbd5b9684049#?env%5Bkubemq-playground%5D=W3sia2V5IjoiaG9zdCIsInZhbHVlIjoiaHR0cHM6Ly9wbGF5Z3JvdW5kLmt1YmVtcS5pbyIsImRlc2NyaXB0aW9uIjoiIiwiZW5hYmxlZCI6dHJ1ZX1d)
:::

::: danger IMPORTANT
Please make sure to include KubeMQ Token/Key in any request to public playground. You can find your Token/Key in your KubeMQ account profile [here](https://account.kubemq.io/home/profile).
:::

## Send Event Message

Send Event RPC call send an event message for both Events and Events Store patterns.

Send Event endpoint is a `POST` function to `host/send/event` where `host` is the KubeMQ REST interface address.

`POST` Event message JSON structure:
```
{
    "EventID": "1234-5678-90",
    "ClientID": "events-client-id",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
    "Store": false
}
```
Where:

| Field    | Type          | Required | Description                                                                                             |
|:---------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------|
| EventID  | string        | No       | event id can set by the sender, if no EventID is set KubeMQ will generate a UUID type value for EventID |
| ClientID | string        | Yes      | Sender Client ID                                                                                        |
| Channel  | string        | Yes      | Channel sender address                                                                                  |
| Metadata | string        | No       | Sender-defined event metadata data                                                                      |
| Body     | string/base64 | Yes      | Sender-defined event body data                                                                          |
| Store    | bool          | Yes      | Store=false send to Event pattern, Store=true send to Event Store pattern                               |


As a Response from `POST` message:

```
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```

## Send Events Stream

Send Events Stream allows opening a bo-directional websocket connection and stream Event messages and receive Response messages.

Send Event endpoint is a `GET` function with websocket upgrade to `host/send/stream` where `host` is the KubeMQ REST interface address.

::: warning NOTE
Since Postman does not support websocket upgrade function, only the GET function is provided.
:::

After websocket upgrade, sending Event messages and receiving responses will use websocket Text format.

Event message JSON structure:
```
{
    "EventID": "1234-5678-90",
    "ClientID": "events-client-id",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
    "Store": false
}
```

Where:

| Field    | Type          | Required | Description                                                                                             |
|:---------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------|
| EventID  | string        | No       | event id can set by the sender, if no EventID is set KubeMQ will generate a UUID type value for EventID |
| ClientID | string        | Yes      | Sender Client ID                                                                                        |
| Channel  | string        | Yes      | Channel sender address                                                                                  |
| Metadata | string        | No       | Sender-defined event metadata data                                                                      |
| Body     | string/base64 | Yes      | Sender-defined event body data                                                                          |
| Store    | bool          | Yes      | Store=false send to Event pattern, Store=true send to Event Store pattern                               |

The websocket will receive Response messages with this structure:

```
{
  "is_error": false,
  "message": "OK",
  "data": {
    "EventID": "1234-5678-90",
    "Sent": true
  }
}
```

## Subscribe To Events

Subscribe To Events allows opening a uni-directional websocket connection and receive both Events and Events Store messages.


### Subscribe to Events

Subscribe Events endpoint is a `GET` function with websocket upgrade to:

```
host/subscribe/events?client_id="client_id"&channel="channel_name"&group="group_name"&subscribe_type=events
```
 

 Where request call parameters are:

| Field          | Type   | Required | Description                   |
|:---------------|:-------|:---------|:------------------------------|
| host           | string | Yes      | KubeMQ REST interface address |
| client_id      | string | Yes      | Sender Client ID              |
| channel        | string | Yes      | Subscribed channel            |
| group          | string | No       | Subscribed group              |
| subscribe_type | string | Yes      | `events`                      |

Event Receive messages format:
```
 {   
    "EventID": "1234-5678-90",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
 }
```

Where:

| Field    | Type          | Description                                                                                             |
|:---------|:--------------|:--------------------------------------------------------------------------------------------------------|
| EventID  | string        | event id can set by the sender, if no EventID is set KubeMQ will generate a UUID type value for EventID |
| Channel  | string        | Channel sender address                                                                                  |
| Metadata | string        | Sender metadata data                                                                                    |
| Body     | string/base64 | Sender body data                                                                                        |



### Subscribe to Events Store

Subscribe Events endpoint is a `GET` function with websocket upgrade to:

 ```
host/subscribe/events?client_id="client_id"&channel="channel_name"&group="group_name"&subscribe_type=events_store&events_store_type_data="subscription_type"&events_store_type_value="subscription_value"
```
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
``` js(4)
 {   
    "EventID": "1234-5678-90",
    "Channel": "events-channel",
    "Metadata": "some-metadata",
    "Body": "c29tZSBlbmNvZGVkIGJvZHk=",
    "Timestamp":1545990840555899600,
    "Sequence":1
 }
```

Where:

| Field     | Type          | Description                                                                                             |
|:----------|:--------------|:--------------------------------------------------------------------------------------------------------|
| EventID   | string        | event id can set by the sender, if no EventID is set KubeMQ will generate a UUID type value for EventID |
| Channel   | string        | Channel sender address                                                                                  |
| Metadata  | string        | Sender metadata data                                                                                    |
| Body      | string/base64 | Sender body data                                                                                        |
| Timestamp | int64         | Unix time format of message                                                                             |
| Sequence  | int           | Events Store message sequence number                                                                    |

::: warning NOTE
Since Postman does not support websocket upgrade function, only the GET function is provided.
:::



## Send Command Request

Send Command RPC call send a command request in Commands pattern.

Send Command endpoint is a `POST` function to `host/send/request` where `host` is the KubeMQ REST interface address.

`POST` Command request JSON structure:
```
 {
   	"RequestID": "a0060e6b-3a9a-4e75-8a69-6a8b6cbae176",
   	"RequestTypeData":1, 
   	"ClientID": "command-client-id",
   	"Channel": "command-channel",
   	"Metadata" :"command-metadata",
   	"Body": "c29tZSBlbmNvZGVkIGJvZHk=",
   	"Timeout": 1000
 }

```
Where:

| Field           | Type          | Required | Description                                                                                                   |
|:----------------|:--------------|:---------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string        | Yes      | request id can set by the sender, if no RequestID is set KubeMQ will generate a UUID type value for RequestID |
| RequestTypeData | int           | Yes      | Command=1                                                                                                     |
| ClientID        | string        | Yes      | Sender Client ID                                                                                              |
| Channel         | string        | Yes      | Channel sender address                                                                                        |
| Metadata        | string        | No       | Sender-defined event metadata data                                                                            |
| Body            | string/base64 | Yes      | Sender-defined event body data                                                                                |
| Timeout         | int           | Yes      | Set Command timeout for response                                                                              |


A successful Command Response from `POST` request:

```
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

```
{
    "is_error": true,
    "message": "Error 301: timeout for request message",
    "data": null
}
```

## Send Query Request

Send Query RPC call send a query request in Query pattern.

Send Query endpoint is a `POST` function to `host/send/request` where `host` is the KubeMQ REST interface address.

`POST` Query request JSON structure:
```
{
   	"RequestID": "a0060e6b-3a9a-4e75-8a69-6a8b6cbae176",
   	"RequestTypeData":2, 
   	"ClientID": "query-client-id",
   	"Channel": "query-channel",
   	"Metadata" :"query-metadata",
   	"Body": "c29tZSBlbmNvZGVkIGJvZHk=",
   	"Timeout": 1000,
   	"CacheKey": "query-cache-key",
	"CacheTTL":10000
 }

```
Where:

| Field           | Type          | Required               | Description                                                                                                   |
|:----------------|:--------------|:-----------------------|:--------------------------------------------------------------------------------------------------------------|
| RequestID       | string        | Yes                    | request id can set by the sender, if no RequestID is set KubeMQ will generate a UUID type value for RequestID |
| RequestTypeData | int           | Yes                    | Query = 2                                                                                                     |
| ClientID        | string        | Yes                    | Sender Client ID                                                                                              |
| Channel         | string        | Yes                    | Channel sender address                                                                                        |
| Metadata        | string        | No                     | Sender-defined event metadata data                                                                            |
| Body            | string/base64 | Yes                    | Sender-defined event body data                                                                                |
| Timeout         | int           | Yes                    | Set Command timeout for response                                                                              |
| CacheKey        | string        | No                     | Set Cache key to retrieve / store response                                                                    |
| CacheTTL        | int           | Yes (if Cache_key set) | Set Cache time to live in seconds                                                                             |


A successful Query Response from `POST` request:

```
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
        "Error": ""
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


A timeout error on unsuccessful Command Response from `POST` request:

```
{
    "is_error": true,
    "message": "Error 301: timeout for request message",
    "data": null
}
```


## Subscribe to Commands

Subscribe to Commands endpoint is a `GET` function with websocket upgrade to:

```
host/subscribe/requests?client_id="client_id"&channel="channel_name"&group="group_name"&subscribe_type=commands
```
 Where request call parameters are:

| Field          | Type   | Required | Description                   |
|:---------------|:-------|:---------|:------------------------------|
| host           | string | Yes      | KubeMQ REST interface address |
| client_id      | string | Yes      | Sender Client ID              |
| channel        | string | Yes      | Subscribed channel            |
| group          | string | No       | Subscribed group              |
| subscribe_type | string | Yes      | `commands`                    |

Commands Requests format:
```
 {  
    "RequestID":"d43d3de0-4bfc-4cb8-9465-7359dc55cf31",
    "RequestTypeData":1,
    "ClientID":"command-client-id",
    "Channel":"command-channel",
    "Metadata":"command-metadata",
    "Body":"c29tZSBlbmNvZGVkIGJvZHk=",
    "ReplyChannel":"_INBOX.lmViYldo2SitpyU15UyK7M.lmViYldo2SitpyU15UyKFw"
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



## Subscribe to Queries

Subscribe to Queries endpoint is a `GET` function with websocket upgrade to:

 ```
 host/subscribe/requests?client_id="client_id"&channel="channel_name"&group="group_name"&subscribe_type=queries
 ```

 Where request call parameters are:

| Field          | Type   | Required | Description                   |
|:---------------|:-------|:---------|:------------------------------|
| host           | string | Yes      | KubeMQ REST interface address |
| client_id      | string | Yes      | Sender Client ID              |
| channel        | string | Yes      | Subscribed channel            |
| group          | string | No       | Subscribed group              |
| subscribe_type | string | Yes      | `queries`                     |

Query Requests format:
```
 {  
    "RequestID":"d43d3de0-4bfc-4cb8-9465-7359dc55cf31",
    "RequestTypeData":2,
    "ClientID":"query-client-id",
    "Channel":"query-channel",
    "Metadata":"query-metadata",
    "Body":"c29tZSBlbmNvZGVkIGJvZHk=",
    "ReplyChannel":"_INBOX.lmViYldo2SitpyU15UyK7M.lmViYldo2SitpyU15UyKFw"
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



## Send Response

Send Response RPC call send a Response to command/query requests in Command and Query patterns.

Send Response endpoint is a `POST` function to `host/send/response` where `host` is the KubeMQ REST interface address.

`POST` Response request JSON structure:
```
{
	"RequestID": "d43d3de0-4bfc-4cb8-9465-7359dc55cf31",
	"ClientID":"response-client-id",
	"ReplyChannel": "_INBOX.x8bxFotxDNG4c3zTp8scBQ.x8bxFotxDNG4c3zTp8scMq",
	"Metadata" :"response-metadat",
	"Body": "c29tZSBlbmNvZGVkIGJvZHk=",
	"Executed": true,
	"Error":""
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


