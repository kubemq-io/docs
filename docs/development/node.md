---
title: NodeJS
lang: en-US
description: 'Node KubeMQ SDK reference'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue','nodejs']
---

# NodeJS

The **KubeMQ SDK for Nodejs** enables Nodejs developers to communicate with [KubeMQ](https://kubemq.io/) server.

## Table of Content
[[toc]]

## General SDK description
The SDK implements all communication patterns available through the KubeMQ server:
- Events
- EventStore
- Command
- Query
- Queue


### Installation

The recommended way to use the SDK for Nodejs in your project is to consume it from NPM
https://www.npmjs.com/package/kubemq-nodejs

## Configurations
The only required configuration setting is the KubeMQ server address.

Configuration can be set by using Environment Variable:

### Configuration via Environment Variable
Set `KubeMQServerAddress` to the KubeMQ Server Address


### Configuration via code
When setting the KubeMQ server address within the code, simply pass the address as a parameter to the various constructors.
See exactly how in the code examples in this document.

## Generating Documentation


## Running the examples.

The [examples](https://github.com/kubemq-io/kubemq-node/tree/master/examples)
are standalone projects that showcase the usage of the SDK.

To run the examples, you need to have a running instance of KubeMQ.


## Main Concepts.

- Metadata: The metadata allows us to pass additional information with the event. It can be in any form that can be presented as a string, i.e., struct, JSON, XML, and many more.
- Body: The actual content of the event. It can be in any form that is serializable into a byte array, i.e., string, struct, JSON, XML, Collection, binary file, and many more.
- ClientID: Displayed in logs, tracing, and KubeMQ dashboard(When using Events Store, it must be unique).
- Tags: Set of Key value pair that help categorize the message

### Event/EventStore/Command/Query.

- Channel: Represents the endpoint target. One-to-one or one-to-many. Real-Time Multicast.
- Group: Optional parameter when subscribing to a channel. A set of subscribers can define the same group so that only one of the subscribers within the group will receive a specific event. Used mainly for load balancing. Subscribing without the group parameter ensures receiving all the channel messages. (When using Grouping all the programs that are assigned to the group need to have to same channel name)
- Event Store: The Event Store represents a persistence store, should be used when need to store data on a volume.
### Queue

- Queue: Represents a unique FIFO queue name, used in queue pattern.
- Transaction: Represents an Rpc stream for single message transaction.


### Event/EventStore/Command/Query SubscribeRequest Object:

A struct that is used to initialize SubscribeToEvents/SubscribeToRequest, the SubscribeRequest contains the following:

- SubscribeType - Mandatory - Enum that represents the subscription type.
- Events - if there is no need for Persistence.
- EventsStore - If you want to receive Events from persistence. See the Main concepts.
- Command - Should be used when a response is not needed.
- Query - Should be used when a response is needed.
- ClientID - Mandatory - See Main concepts.
- Channel - Mandatory - See Main concepts.
- Group - Optional - See Main concepts.
- EventsStoreType - Mandatory - set the type event store to subscribe to Main concepts.

## Queue.

KubeMQ supports distributed durable FIFO based queues with the following core features:

- Exactly One Delivery - Only one message guarantee will deliver to the subscriber.
- Single and Batch Messages Send and Receive - Single and multiple messages in one call.
- RPC and Stream Flow - RPC flow allows an insert and pulls messages in one call. Streamflow allows single message consuming in a transactional way.
- Message Policy - Each message can be configured with expiration and delay timers. Also, each message can specify a dead-letter queue for un-processed messages attempts.
- Long Polling - Consumers can wait until a message available in the queue to consume.
- Peak Messages - Consumers can peek into a queue without removing them from the queue.
- Ack All Queue Messages - Any client can mark all the messages in a queue as discarded and will not be available anymore to consume.
- Visibility timers - Consumers can pull a message from the queue and set a timer, which will cause the message not to be visible to other consumers. This timer can be extended as needed.
- Resend Messages - Consumers can send back a message they pulled to a new queue or send a modified message to the same queue for further processing.

### Send Message to a Queue

```js
const kubemq = require('kubemq-nodejs');

let queueName = 'testQueue', clientID = 'test-queue-client-id2',
    kubeMQAddress = 'localhost:50000';


let queue = new kubemq.Queue(kubeMQAddress, queueName, clientID);

queue.sendQueueMessage(
    new kubemq.Message('metadata', kubemq.stringToByte('some-simple_queue-queue-message')))
    .then(sent => {
        if (sent.Error) {
            console.log('message enqueue error, error:' + err);
        } else {
            console.log('"message sent at:' + sent.SentAt);
        }
    }).catch(err => {
        console.log('message enqueue error, error:' + err);
    });


```

 ### Send Message to a Queue with Expiration

```js
	const kubemq = require('kubemq-nodejs');
	let queueName = 'testQueue', clientID = 'test-queue-client-id2',
    kubeMQAddress = 'localhost:50000';


	let queue = new kubemq.Queue(kubeMQAddress, queueName, clientID);
	let message =new kubemq.Message('metadata', kubemq.stringToByte('some-simple_queue-queue-message'))
	message.addExpiration(1)
	queue.sendQueueMessage(
		message)
		.then(sent => {
			if (sent.Error) {
				console.log('message enqueue error, error:' + err);
			} else {
				console.log('"message sent at:' + sent.SentAt);
			}
		}).catch(err => {
			console.log('message enqueue error, error:' + err);
    });


```

### Send Message to a Queue with Delay

```js
	const kubemq = require('kubemq-nodejs');

	let queueName = 'testQueue', clientID = 'test-queue-client-id2',
		kubeMQAddress = 'localhost:50000';


	let queue = new kubemq.Queue(kubeMQAddress, queueName, clientID);
	let message =new kubemq.Message('metadata', kubemq.stringToByte('some-simple_queue-queue-message'))
	message.addDelay(1)
	queue.sendQueueMessage(
		message)
		.then(sent => {
			if (sent.Error) {
				console.log('message enqueue error, error:' + err);
			} else {
				console.log('"message sent at:' + sent.SentAt);
			}
		}).catch(err => {
			console.log('message enqueue error, error:' + err);
		});
```


### Send Batch Messages

```js
	const kubemq = require('kubemq-nodejs');


	let message_queue = new kubemq.MessageQueue('localhost:50000', 'testQueue', 'client');

	let messages = [];
	for (let index = 0; index < 20; index++) {
	   messages.push(new kubemq.Message(`MyMessage:${index}`, kubemq.stringToByte(`Message body:${index}`)));
	}

	message_queue.sendQueueMessageBatch(messages).then(res => {
	   console.log(res)
	});
	console.log("batch messages were sent");

```

### Receive Messages from a Queue

```js
	const kubemq = require('kubemq-nodejs');
	let queueName = 'testQueue', clientID = 'test-queue-client-id2',
		kubeMQAddress = 'localhost:50000';


	let queue = new kubemq.Queue(kubeMQAddress, queueName, clientID);
	queue.receiveQueueMessages(2, 1).then(res => {
		if (res.Error) {
			console.log('Message enqueue error, error:' + res.message);
		} else {
			if (res.MessagesReceived) {
				console.log('Received: ' + res.MessagesReceived);
				res.Messages.forEach(element => {
					console.log('MessageID:' + element.MessageID + ', Body:' + kubemq.byteToString(element.Body));
				});
			} else {
				console.log('No messages');
			}
		}
	}).catch(
		err => console.log('Error:' + err));

```

### Peek Messages from a Queue

```js
	const kubemq = require('kubemq-nodejs');

	let message_queue   =     new kubemq.MessageQueue('localhost:50000','testQueue','client');

			message_queue.peekQueueMessage().then(receivedMessages=>{
				receivedMessages.Messages.forEach(element => {               
					console.log('peek message:'+ kubemq.byteToString(element.Body));
				})         
	});
 
```
### Ack All Messages In a Queue

```js
	const kubemq = require('kubemq-nodejs');

	let message_queue   =     new kubemq.MessageQueue('localhost:50000','testQueue','client');

			message_queue.ackAllQueueMessages().then(ackAllResponse => {
				console.log("called ack all")   
	});
```

### Transactional Queue - Ack and reject
```js
    const kubemq = require('kubemq-nodejs');



	let message_queue = new kubemq.MessageQueue('localhost:50000', 'testQueue', 'client');



	let transaction = message_queue.createTransaction();
	transaction.receive(100, 1, queueHandler, errorHandler)

	function queueHandler(msg) {
	  console.log(`Received messages ${msg.StreamRequestTypeData}`);
	  if (msg.StreamRequestTypeData == "ReceiveMessage") {
		if (msg.IsError === false) {
		  let msgSequence = msg.Message.Attributes.Sequence;
		  workOnMSG(msg).then(_ => {
			transaction.ackMessage(msgSequence).then(_ => {
			  console.log("ack was called");
			}
			)
		  }).catch(_ => {
			transaction.rejectedMessage(msgSequence).then(_ => {
			  console.log('msg was rejected');
			});
		  });
		} else {
		  console.log(`Received error of ${msg.Error}`);
		}
	  }
	  else if (msg.StreamRequestTypeData === "AckMessage" || msg.StreamRequestTypeData === "RejectMessage") {
		transaction.closeStream();
		console.log('msg Ack, stream was close');

		//loop a a long pool request.
		transaction = message_queue.createTransaction();
		transaction.receive(100, 1, queueHandler, errorHandler)
	  }
	};

	function errorHandler(msg) {
	  console.log(`Received error ${msg}`);
	};

	function workOnMSG(msg) {
	  return new Promise((resolve, reject) => {
		if (msg.Message.Attributes.Sequence !== '3') {
		  console.log('worked on msg');
		  resolve();
		}
		else {
		  reject();
		}
	  });
	};

```


### Transactional Queue - Extend Visibility

```js
	const kubemq = require('kubemq-nodejs');

	let message_queue = new kubemq.MessageQueue('localhost:50000', 'testQueue', 'client');


	  let transaction      =     message_queue.createTransaction();

	  function queueHandler(msg) {
		  console.log(`Received messages ${msg.StreamRequestTypeData}`);
		  if (msg.StreamRequestTypeData=="ReceiveMessage")
		  {
			console.log("Need more time to process, extend visibility for more 3 seconds");
			transaction.extendVisibility(3).then(_=> {
			  console.log(`sent extendVisibilityRequest`);
			});
		  }
	  }

	  function errorHandler(msg) {
		console.log(`Received error ${msg}`);
	  };
		transaction.receive(5, 10,queueHandler,errorHandler);
        

```

### Transactional Queue - Resend to New Queue

```js
	const kubemq = require('kubemq-nodejs');

	let message_queue = new kubemq.MessageQueue('localhost:50000', 'testQueue', 'client');


	let transaction      =     message_queue.createTransaction();

	function queueHandler(msg) {
		console.log(`Received messages ${msg}`);
		if (msg.StreamRequestTypeData=="ReceiveMessage")
		{
		  console.log("Received Message sending resend request.");
		  transaction.resend('newQueue').then(_=> {
			console.log(`sent resend`);
		  });
		}
	}

	function errorHandler(msg) {
	  console.log(`Received error ${msg}`);
	};

	  transaction.receive(5, 10,queueHandler,errorHandler);
```

### Transactional Queue - Resend Modified Message
```js
	const kubemq = require('kubemq-nodejs');
	let message_queue = new kubemq.MessageQueue('localhost:50000', 'testQueue', 'Client');


	let transaction      =     message_queue.createTransaction();

	function queueHandler(msg) {
		console.log(`Received messages ${msg}`);
		if (msg.StreamRequestTypeData=="ReceiveMessage")
		{
		  msg.Metadata= "new meta data"
		  msg.Channel= "testQueue"
		  msg.ClientID = "Client"
		  console.log("Received Message sending modify request.");
		  transaction.modify(msg).then(_=> {
			console.log(msg);
		  });
		}
	}

	function errorHandler(msg) {
	  console.log(`Received error ${msg}`);
	};

	  transaction.receive(5, 10,queueHandler,errorHandler);
```

## Event
### Sending Events


#### Single event
```js
	const kubemq = require('kubemq-nodejs');

	let channelName = 'pubsub', clientID = 'hello-world-subscriber',
		kubeMQHost = 'localhost', kubeMQGrpcPort = '50000';

	const publisher = new kubemq.Publisher(kubeMQHost, kubeMQGrpcPort, clientID, channelName);

	let event = new kubemq.Publisher.Event(kubemq.stringToByte('hello kubemq - sending single event'));

	publisher.send(event).then(
		res => {
			console.log(res);
		}).catch(
			err => {
				console.log('error sending' + err)
			});


```

#### Stream Events
```js


	const kubemq = require('kubemq-nodejs');
	let kubemqAdd = "localhost:50000";

	const events          =   require('events');

	let channelName	        =	  "test-event-stream";
	let send                =	  new kubemq.Sender(kubemqAdd);
	let bytes = [];

	for (let i = 0; i < "myTestStream".length; i++) {
	  let char = "myTestStream".charCodeAt(i);
	  bytes.push(char >>> 8);
	  bytes.push(char & 0xFF);
	}

	let eventEmmiter = new events.EventEmitter();


	send.streamEvent(eventEmmiter)
	console.log('test')
	for (let i = 1; i < 5; i++) {
	  let event= new kubemq.LowLevelEvent(bytes);
	  event.Channel = channelName;
	  event.ClientID ="MyID";
	  eventEmmiter.emit('message',event)
	  
	}
```

### Receiving Events

```js
	const kubemq = require('kubemq-nodejs');

	let channelName = 'pubsub', clientID = 'hello-world-subscriber',
		kubeMQHost = 'localhost', kubeMQGrpcPort = '50000';

	let sub = new kubemq.Subscriber(kubeMQHost, kubeMQGrpcPort, clientID, channelName);

	sub.subscribeToEvents(msg => {
		console.log('Event Received: EventID:' + msg.EventID + ', Channel:' + msg.Channel + ' ,Metadata:' + msg.Metadata + ', Body:' + kubemq.byteToString(msg.Body));
	}, err => {
		console.log('error:' + err)
	})



```

## Event Store

### Subscription Options

KubeMQ supports six types of subscriptions:

- StartFromNewEvents - start event store subscription with only new events

- StartFromFirstEvent - replay all the stored events from the first available sequence and continue stream new events from this point

- StartFromLastEvent - replay the last event and continue stream new events from this point

- StartFromSequence - replay events from specific event sequence number and continue stream new events from this point

- StartFromTime - replay events from specific time continue stream new events from this point

- StartFromTimeDelta - replay events from specific current time - delta duration in seconds, continue stream new events from this point

#### Single Event Store

```js
	const kubemq = require('kubemq-nodejs');

	let channelName = 'sub', clientID = 'hello-testing_event_channel-subscriber',
		kubeMQHost = 'localhost', kubeMQGrpcPort = '50000';


	let storePub = new kubemq.StorePublisher('localhost', '50000', clientID+'sender', channelName);

	let eventStore = new kubemq.StorePublisher.Event('test');
	eventStore.Metadata = 'test store';

	storePub.send(eventStore).then(
		res => {
			console.log(res);
		}).catch(
		err => {
		console.log('error sending' + err)
	});

```

### Receiving Events Store

```js
		const kubemq = require('kubemq-nodejs');

		let channelName = 'sub', clientID = 'hello-testing_event_channel-subscriber';

		let storeSub = new kubemq.StoreSubscriber('localhost', '50000', clientID+'store', channelName);

		storeSub.subscribeToEvents(msg => {
			console.log('msg:' + msg.Metadata)
		}, 
		err => { console.log('error:' + err) },

		kubemq.EventStoreType.StartFromFirst, '1');


	​
```

## Commands

### Concept

Commands implement the synchronous messaging pattern in which the sender sends a request and waits for a specific amount of time to get a response.  
The response can be successful or not. This is the responsibility of the responder to return with the result of the command within the time the sender set in the request.

#### Receiving Commands Requests
```js
	const kubemq = require('kubemq-nodejs');

	let channelName = 'testing_Command_channel', clientID = 'hello-world-sender',
		kubeMQHost = 'localhost', kubeMQGrpcPort = '50000';

	let receiver = new kubemq.CommandReceiver(kubeMQHost, kubeMQGrpcPort, clientID, channelName);
	receiver.subscribe(cmd => {
		let response = new kubemq.CommandReceiver.Response(cmd, true);
		response.Timestamp = Math.floor(new Date() / 1000);
		receiver.sendResponse(response).then(snd => {
			console.log('sent:' + snd);
		}).catch(cht => console.log(cht));
	}, err => {
		console.log(err);
	});
```

### Sending Command Request

```js
	const kubemq = require('kubemq-nodejs');

	let kubeMQHost = 'localhost', kubeMQGrpcPort = '50000',
		channelName = 'testing_Command_channel', clientID = 'hello-world-sender',
		defaultTimeOut = 10000;

	let sender = new kubemq.CommandSender(kubeMQHost, kubeMQGrpcPort, clientID, channelName, defaultTimeOut);

	let request = new kubemq.CommandSender.CommandRequest(
		kubemq.stringToByte(' hello kubemq - sending a command, please reply'));

	sender.send(request).then(
		res => {
			if (res.Error) {
				console.log('Response error: ' + res.message);
				return;
			}
			console.log('Response Received:' + res.RequestID + ' ExecutedAt:' + res.Timestamp);
		}).catch(
			err => {
				console.log('command error: ' + err)
			});
```

## Queries

### Concept

Queries implement the synchronous messaging pattern in which the sender sends a request and waits for a specific amount of time to get a response.

The response must include metadata or body together with an indication of successful or not operation. This is the responsibility of the responder to return with the result of the query within the time the sender set in the request.

### Receiving Query Requests

```js
	const kubemq = require('kubemq-nodejs');
	let query = new kubemq.QueryReceiver('localhost', '50000', 'cc', 'qry', undefined, 10000);

	query.subscribe(qry => {
		console.log(qry);
		let respond = new kubemq.QueryReceiver.QueryResponse(qry, kubemq.stringToByte('result:123'));
		query.sendResponse(respond).then(snd => {
			console.log('sent:' +snd);
		}).catch(cht => console.log(cht));

	}, err => {
		console.log(err);
	}
	)



```

### Sending Query Requests

```js
 
	const kubemq = require('kubemq-nodejs');
	let qrySend = new kubemq.QuerySender('localhost', '50000', 'cc1', 'qry', 10000);

	let request = new kubemq.QueryRequest(kubemq.stringToByte('select books'));
	qrySend.send(request).then(res => {
		 console.log(res) });
```
