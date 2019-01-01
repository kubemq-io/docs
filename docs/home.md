# Introduction

## What is KubeMQ ?
KubeMQ is a Cloud Native, enterprise grade message broker for distributed services architecture. 

KubeMQ is delivered as a small, lightweight Docker container, designed for any type of workload and architecture running in Kubernetes or any other containers orchestration system which support Docker.

## Main Features
- All-batteries included Messaging Broker for Kubernetes environment 
- Blazing fast (written in Go), Small and lightweight Docker container
- Asynchronous and Synchronous messaging with support for `At Most Once Delivery` and `At Least Once Delivery` models
- Supports Pub/Sub (Events), Pub/Sub with Persistence (Events Store), CQRS (Command,Query) messaging patterns
- Supports gRPC, Rest and WebSocket Transport protocols with TLS support (both RPC and Stream modes)
- Runs in Single and cluster modes
- No Message broker configuration needed (i.e. queues, exchanges) 
- Built-in Caching, Metrics and Tracing
- .Net, Java, Python, Go and NodeJS(coming-soon) SDK   
- MSSQL and MSMQ Connectors (AMQP and JMS coming-soon)
- Monitoring Dashboard
