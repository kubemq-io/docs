---
title: Pub/Sub
lang: en-US
description: 'KubeMQ Pub/Sub tutorial'
tags: ['pub/sub','rpc','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','guide','tutorial']
---
# Pub/Sub (Publish-Subscribe) <Badge text="v1.6.0+"/> <Badge text="stable"/>
The publish-subscribe pattern (or pub/sub, for short) is a messaging pattern where senders of messages (publishers), do not program the messages to be sent directly to specific receivers (subscribers). Instead, the programmer “publishes” messages (events), without any knowledge of any subscribers there may be.

Similarly, subscribers express interest in one or more events and only receive messages that are of interest, without any knowledge of any publishers.

![image info](./images/pubsub.png)
## Table of Content
[[toc]]

## Core Features
KubeMQ supports Publish-Subscribe messages patterns with the following core features:

- **Events** - An asynchronous real-time Pub/Sub pattern.
- **Events Store** - An asynchronous Pub/Sub pattern with persistence.
- **Grouping** - Load balancing of events between subscribers
- **Partitioning** - Channels/Topics based wildcards


## Events
Events are an asynchronous real-time Pub/Sub pattern.
In Events, multiple senders can send real-time messages to various receivers; however, only if they are currently connected to KubeMQ; there is no message persistence available in this pattern.

![image info](./images/event.png)

**Use Cases**

‘Events’ pattern is suitable for cases such as publishing streaming data, logs, notifications, etc.

### Demo - Basic

<div class="video-block">
<iframe src="https://player.vimeo.com/video/372195988" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

### Demo - Group (Load Balancing)

<div class="video-block">
<iframe src="https://player.vimeo.com/video/372195963" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>


### Demo - Wildcards

<div class="video-block">
<iframe src="https://player.vimeo.com/video/372196013" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>


## Events Store
Events Store is an asynchronous Pub/Sub pattern with persistence.
In Events Store, multiple senders can send messages to various receivers even if they are not currently. Any receiver can connect to KubeMQ and replay one, any, or all of the messages stored for a specific channel.

![image info](./images/event-store.png)

### Events Store Replay Messages Types

KubeMQ supports six types of Events Store subscriptions and replay:

| Type            | Description                                                                                                  |
|:----------------|:-------------------------------------------------------------------------------------------------------------|
| New Events      | KubeMQ will send only new events                                                                             |
| First Event     | KubeMQ will replay all events from the first stored events, as well as send new events                          |
| Last Event      | KubeMQ will replay the last event and continue to send new events                                            |
| From Sequence   | KubeMQ will replay events from a specific sequence and continue to send new events                             |
| From Time       | KubeMQ will replay events from a specific time in the past and continue to send new events                     |
| From Time Delta | KubeMQ will replay events from the particular time delta back (i.e., 5 min back) and continue to send new events |


#### Start From New Events

![image info](./images/event-store-from-new.png)

##### Demo
<div class="video-block">
<iframe src="https://player.vimeo.com/video/372195866" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

#### Start From First Event

![image info](./images/event-store-from-first.png)

##### Demo

<div class="video-block">
<iframe src="https://player.vimeo.com/video/372196147" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>


#### Start From Last Event

![image info](./images/event-store-from-last.png)

##### Demo
<div class="video-block">
<iframe src="https://player.vimeo.com/video/372196161" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

#### Start From Sequence

![image info](./images/event-store-from-seq.png)
##### Demo
<div class="video-block">
<iframe src="https://player.vimeo.com/video/372195881" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

#### Start From Time

![image info](./images/event-store-from-time.png)

##### Demo
<div class="video-block">
<iframe src="https://player.vimeo.com/video/372195889" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

#### Start From Time Delta

![image info](./images/event-store-from-time-delta.png)

##### Demo
<div class="video-block">
<iframe src="https://player.vimeo.com/video/372195899" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

### Grouping - Load Balancing
KubeMQ supports grouping (load balancing) of multiple receivers to share the load

#### Demo

##### Example 1
![kubemqctl-pub-sub-events-store-groups-1.gif](./demo/kubemqctl-pub-sub-events-store-groups-1.gif)

##### Example 2
![kubemqctl-pub-sub-events-store-groups-2.gif](./demo/kubemqctl-pub-sub-events-store-groups-2.gif)

##### Example 3
![kubemqctl-pub-sub-events-store-groups-3.gif](./demo/kubemqctl-pub-sub-events-store-groups-3.gif)


### Unique Client ID

The uniqueness of a client ID is essential when using Events Store.  At any given time, only one receiver can connect with a unique Client ID. If two receivers try to connect to KubeMQ with the same Client ID, one of them will be rejected.

**Client ID and Subscription Types Relations**

For each unique Client ID, KubeMQ saves the subscription type in which the client connected; messages can only be replayed once per Client ID and Subscription type.

For example, Receiver with Client ID `client-foo-1` subscribes to a channel `foo.bar` in `First Event` mode. They will get all the messages stored in KubeMQ for `foo.bar` channel from the first message, and then continue to get new events as they come.
If this receiver will disconnect from KubeMQ and re-connect again with any subscription type, only new events in `foo.bar` will be delivered for this specific receiver with Client ID `client-foo-1`.

If a Receiver wishes to receive messages on `foo.bar` again, they should subscribe again with a different Client ID than `client-foo-1` such `client-foo-1-retry`.

**Use Cases**

Events Store pattern is suitable for cases in which events are necessary, such as worker’s pool, chats, and inbox related applications.
