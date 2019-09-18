---
title: Kubemqctl
lang: en-US
type: 'article'
description: 'KubeMQ configuration manual'
tags: ['pub/sub','message broker','KubeMQ','kubernetes','docker','cloud native','message queue']
---
# KubeMQ Direct Configuration
KubeMQ server can be configured by Kubemqctl or via environment variables set during container loading.


## Table of Content
[[toc]]

## Kubemqctl Configuration

## Default Configuration


Run Kubemqctl create cluster command:

``` bash
Kubemqctl cluster create -t <YOUR_KUBEMQ_TOKEN>
```

For Example:

![get-started-Kubemqctl.gif](./images/get-started-Kubemqctl.gif)


## Environment Configuration

<CodeSwitcher :languages="{token:'With Token',lic:'With License Key'}" :isolated="true">

<template v-slot:token>

The KubeMQ general configuration can be set as below:

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN # Sets the KubeMQ token key
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: KUBEMQ_PORT # Sets KubeMQ service API port for health, metrics and traces
              value: '8080'
            - name: KUBEMQ_LOG_LEVEL # Sets KubeMQ stdout log level where:  1 - Debug 2 - Info 3 - Warn 4 - Error 5 - Fatal
              value: '2'  
            - name: KUBEMQ_PROXY # Sets Proxy server address url access (in case license validation failure) 
              value: 'proxy-host:proxy-port'  

           image: 'kubemq/kubemq:latest'
....        
```

</template>

<template v-slot:lic>

In case KubeMQ is deployed into environment without internet connectivity, you can get a license data by contact [support](mailto:support@kubemq.io).

After receiving a license data, you can set the configuration as below:

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN # Sets the KubeMQ token key
              value: <YOUR-KUBEMQ-TOKEN>
            - name: KUBEMQ_LICENSE_DATA # Sets the KubeMQ license data
              value: <license data>
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
            - name: KUBEMQ_PORT # Sets KubeMQ service API port for health, metrics and traces
              value: '8080'
            - name: KUBEMQ_LOG_LEVEL # Sets KubeMQ stdout log level where:  1 - Debug 2 - Info 3 - Warn 4 - Error 5 - Fatal
              value: '2'  
            - name: KUBEMQ_PROXY # Sets Proxy server address url access (in case license validation failure) 
              value: 'proxy-host:proxy-port'  

           image: 'kubemq/kubemq:latest'
....        
```

</template>


</CodeSwitcher>





## Cluster
The KubeMQ cluster configuration can be set as below:

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
            - name: CLUSTER_ROUTES #Sets the address of other KubeMQ nodes forming a cluster 
              value: 'kubemq-cluster:5228'
            - name: CLUSTER_PORT # Sets the KubeMQ cluster listening port 
              value: '5228'
            - name: CLUSTER_ENABLE # Sets the KubeMQ clustering mode
              value: 'true'
            - name: GRPC_PORT
              value: '50000'
            - name: REST_PORT
              value: '9090'
            - name: KUBEMQ_PORT
              value: '8080'
            - name: CLUSTER_IS_SEED # Sets the current KubeMQ node as the seed (when not running as the stateful set 
              value: 'true'  
           image: 'kubemq/kubemq:latest'
....        
```


## Persistence

<CodeSwitcher :languages="{general:'General',queues:'Queues'}" :isolated="true">

<template v-slot:general>


The KubeMQ general persistence configuration can be set as below:


``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR # Sets KubeMQ persistence folder 
              value: '/store'  
            - name: STORE_CLEAN  # true=KubeMQ will clean all the files in the store on boot       
              value: 'true'  
            - name: STORE_MAX_QUEUES # Sets KubeMQ limit of the number of persistent channels/queues, 0 = unlimited    
              value: '0'   
            - name: STORE_MAX_SUBSCRIBERS # Sets KubeMQ limit of the number of subscribers per channel/queue, 0 = unlimited 
              value: '0'   
            - name: STORE_MAX_MESSAGES  # Sets KubeMQ limit of the number of stored messages per channel/queue, 0 = unlimited       
              value: '0'  
            - name: STORE_MAX_SIZE  # Sets KubeMQ max size in bytes per channel/queue, 0 = unlimited        
              value: '0'  
            - name: STORE_MAX_RETENTION # Sets KubeMQ store time in minutes for each message per channel/queue, 0 = infinite    
              value: '1440'   
            - name: STORE_MAX_INACTIVITY_PURGE # Sets KubeMQ delete channel/queue due to inactivity time in minutes, 0 = no purging  
              value: '1440'   
           image: 'kubemq/kubemq:latest'
....        
```

</template>

<template v-slot:queues>

The KubeMQ Queues persistence configuration can be set as below:


``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: QUEUE_MAX_NUMBER_OF_MESSAGE  # Sets max of sending / receiving batch of queue messages, default 1024, 0 is unlimited     
              value: '1024'  
            - name: QUEUE_MAX_WAIT_TIMEOUT_SECONDS # Sets max wait time out allowed for receive message, default 3600 seconds, 1 hour   
              value: '3600'   
            - name: QUEUE_MAX_EXPIRATION_SECONDS #  Sets max expiration allowed for message, default 43200 seconds, 12 hours
              value: '43200'   
            - name: QUEUE_MAX_DELAY_SECONDS  #  Sets max delay seconds allowed for message, default 43200 seconds, 12 hours        
              value: '43200'  
            - name: QUEUE_MAX_RECEIVE_COUNT  # Sets max retires to receive message before discard, default 1024 times      
              value: '1024'  
            - name: QUEUE_MAX_VISIBILITY_SECONDS # Sets max time of hold received message before returning to queue, default 43200 seconds, 12 hours  
              value: '43200'   
            - name: QUEUE_DEFAULT_VISIBILITY_SECONDS #  Sets default time of hold received message before returning to queue, default 60 seconds  
              value: '60'   
            - name: QUEUE_DEFAULT_WAIT_TIMEOUT_SECONDS  # Sets default time to wait for a message in a queue, default 1 second        
              value: '1'                
           image: 'kubemq/kubemq:latest'
....        
```

</template>

</CodeSwitcher>


## gRPC Interface
The KubeMQ gRPC interface configuration can be set as below:


<CodeSwitcher :languages="{general:'General',security:'Security'}" :isolated="true">


<template v-slot:general>

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: GRPC_ENABLE  # Enable/Disable the gRPC interface     
              value: 'true'  
            - name: GRPC_PORT # Sets Docker exposed port  
              value: '50000'   
            - name: GRPC_SUB_BUFF_SIZE #  Sets the subscribe message / requests buffer size to use on the server  
              value: '100'   
            - name: GRPC_BODY_LIMIT  # Sets request body limit in bytes (must be > 0)      
              value: '4194304'  
           image: 'kubemq/kubemq:latest'
....        
```

</template>


<template v-slot:security>


``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
            - name: CLUSTER_ROUTES
              value: 'kubemq-cluster:5228'
            - name: CLUSTER_PORT
              value: '5228'
            - name: CLUSTER_ENABLE
              value: 'true'
            - name: REST_PORT
              value: '9090'
            - name: KUBEMQ_PORT
              value: '8080'
            - name: STORE_DIR
              value: '/store'
            - name: GRPC_ENABLE  # Enable/Disable the gRPC interface     
              value: 'true'  
            - name: GRPC_PORT # Sets Docker exposed port  
              value: '50000'   
            - name: GRPC_SECURITY_TLS_MODE # Sets Security mode, `none` = no security, `tls` = TLS secured  
              value: 'tls'   
            - name: GRPC_SECURITY_CERT_FILE  # Sets CERT file name and location    
              value: './cert_file'  
            - name: GRPC_SECURITY_KEY_FILE # Sets Key file name and location  
              value: './key_file'   
           image: 'kubemq/kubemq:latest'
....        
```

</template>

</CodeSwitcher>


## REST Interface
KubeMQ REST interface configuration can be set as below:


<CodeSwitcher :languages="{general:'General',security:'Security',cors:'CORS'}" :isolated="true">


<template v-slot:general>

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: REST_ENABLE  # Enable/Disable REST interface     
              value: 'true'  
            - name: REST_PORT # Sets Docker exposed port  
              value: '9090'   
            - name: REST_SUB_BUFF_SIZE # Sets subscribe message / requests buffer size to use on server  
              value: '100'   
            - name: REST_BODY_LIMIT  #Sets request body limit, (i.e. 2M), limit can be specified as 4x or 4xB, where x is one of the multiple from K, M, G, T or P    
              value: ''  
           image: 'kubemq/kubemq:latest'
....        
```

</template>


<template v-slot:security>


``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
            - name: CLUSTER_ROUTES
              value: 'kubemq-cluster:5228'
            - name: CLUSTER_PORT
              value: '5228'
            - name: CLUSTER_ENABLE
              value: 'true'
            - name: GRPC_PORT
              value: '50000'
            - name: KUBEMQ_PORT
              value: '8080'
            - name: STORE_DIR
              value: '/store'
            - name: REST_ENABLE  # Enable/Disable REST interface     
              value: 'true'  
            - name: REST_PORT # Sets Docker exposed port  
              value: '9090'   
            - name: REST_SECURITY_TLS_MODE #  Sets Security mode,`none` = no security, `tls` = TLS secured  
              value: 'tls'   
            - name: REST_SECURITY_CERT_FILE  # Sets CERT file name and location    
              value: './cert_file'  
            - name: REST_SECURITY_KEY_FILE # Sets Key file name and location  
              value: './key_file'   
            - name: REST_READ_TIMEOUT  # Sets REST read timeout in seconds 
              value: '60'  
            - name: REST_WRITE_TIMEOUT # Sets REST write timeout in seconds   
              value: '60'   
           image: 'kubemq/kubemq:latest'
....        
```

</template>


<template v-slot:cors>


``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: REST_ENABLE  # Enable/Disable REST interface     
              value: 'true'  
            - name: REST_PORT # Docker exposed port  
              value: '9090'   
            - name: REST_CORS_ALLOW_ORIGINS # Defines a list of origins that may access the resource, default value *  
              value: '{*}'   
            - name: REST_CORS_ALLOW_METHODS  # Sets a list of origins that may access the resource   
              value: '{"GET", "POST"}'  
            - name: REST_CORS_ALLOW_HEADERS # Sets a list of request headers that can be used when making the actual request  
              value: '{}'   
            - name: REST_CORS_ALLOW_CREDENTIALS  # Sets whether or not the response to the request can be exposed when the credentials flag is true
              value: 'false'  
            - name: REST_CORS_EXPOSE_HEADERS # Sets a whitelist headers that clients are allowed to access   
              value: '{}'               
            - name: REST_CORS_MAX_AGE # Sets how long (in seconds) the results of a pre-flight request can be cached   
              value: '0'   
           image: 'kubemq/kubemq:latest'
....        
```


</template>

</CodeSwitcher>



## Logging

KubeMQ supports stdout logging, in addition to docker sending logs to local files and to the [Logly](https://www.loggly.com/) external service.


<CodeSwitcher :languages="{file:'File',loggly:'Loggly'}" :isolated="true">


<template v-slot:file>

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: LOG_FILE_ENABLE  # Enable/Disable saving logs to file    
              value: 'true'  
            - name: LOG_FILE_PATH # Sets file write path, default: ./log
              value: './log'   
           image: 'kubemq/kubemq:latest'
....        
```

</template>


<template v-slot:loggly>


``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: LOG_LOGGLY_ENABLE  # Enable/Disable sending logs to https://www.loggly.com/ external service    
              value: 'true'  
            - name: LOG_LOGGLY_KEY # Loggly access key  
              value: ''   
            - name: LOG_LOGGLY_FLUSH_INTERVAL # Set Loggly sending logs interval in seconds   
              value: '5'   
           image: 'kubemq/kubemq:latest'
....        
```


</template>


</CodeSwitcher>


## Observability

KubeMQ exports both metrics and tracing observability information by embedding the [OpenCensus](https://opencensus.io/) library.

The following backend systems are supported:

| Backend                                                     | Stats | Tracing |
|:------------------------------------------------------------|:------|:--------|
| [Prometheus](https://prometheus.io/)                        | Yes   | No      |
| [Honeycomb](https://www.honeycomb.io/)                      | No    | Yes     |
| [AWS X-Ray](https://console.aws.amazon.com/xray/home)       | No    | Yes     |
| [Datadog](https://www.datadoghq.com/)                       | Yes   | Yes     |
| [Jeager](https://www.jaegertracing.io/)                     | No    | Yes     |
| [StackDriver](https://console.cloud.google.com/monitoring) | Yes   | Yes     |
| [Zimpkin](https://zipkin.io/)                               | No    | Yes     |



<CodeSwitcher :languages="{prometheus:'Prometheus',jeager:'Jeager',zipkin:'Zipkin', honeycomb:'Honeycomb',google:'StackDriver',amazon:'AWS X-Ray',datadog:'Datadog'}" :isolated="true">


<template v-slot:prometheus>

First, add the following annotations to pod metadata:

```yaml
...
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
      annotations: # add here prometheus annotations
        prometheus.io/scrape: 'true'
        prometheus.io/port: '9102'
        prometheus.io/path: '/metrics'       
    spec:
      containers:

...
```

Second, add the following environment variables to KubeMQ's stateful set yaml definition

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: METRICS_DISABLE  # Sets KubeMQ and disables observability metrics exporting  
              value: 'false'  
            - name: METRICS_TRACING_SAMPLE # Sets KubeMQ tracing sample probability as a percentage, i.e 0.1 =10%  
              value: '0.1'   
            - name: METRICS_PROMETHEUS_ENABLE  # Enable/Disable Prometheus exporting  
              value: 'true'  
            - name: METRICS_PROMETHEUS_PATH # Sets Prometheus scraping end point (on the KubeMQ service API address)  
              value: '/metrics'   
           image: 'kubemq/kubemq:latest'
....        
```

</template>

<template v-slot:jeager>


Add the following environment variables to KubeMQ's stateful set yaml definition

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: METRICS_DISABLE  # Sets KubeMQ and disables observability metrics exporting  
              value: 'false'  
            - name: METRICS_TRACING_SAMPLE # Sets KubeMQ tracing sample probability as a percentage, i.e 0.1 =10%  
              value: '0.1'   
            - name: METRICS_JEAGER_ENABLE # Enable/Disable Jeager exporting 
              value: 'true'  
            - name: METRICS_JEAGER_COLLECTOR_ADDRESS # Sets Jeager collector address 
              value: 'jeager collector address'  
            - name: METRICS_JEAGER_AGENT_ADDRESS # Sets Jeager agent address
              value: 'jeager agent address'  
          image: 'kubemq/kubemq:latest'
....        
```


</template>

<template v-slot:zipkin>

Add the following environment variables to KubeMQ's stateful set yaml definition

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: METRICS_DISABLE  # Sets KubeMQ and disables observability metrics exporting  
              value: 'false'  
            - name: METRICS_TRACING_SAMPLE # Sets KubeMQ tracing sample probability as a percentage, i.e 0.1 =10%  
              value: '0.1'   
            - name: METRICS_ZIPKIN_ENABLE # enable/disable Zipkin exporting
              value: 'true'  
            - name: METRICS_ZIPKEIN_REPORTER_ADDRESS # sets Zipkin's reporter address 
              value: '/metrics'  
          image: 'kubemq/kubemq:latest'
....        
```


</template>

<template v-slot:honeycomb>


Add the following environment variables to KubeMQ's stateful set yaml definition

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: METRICS_DISABLE  # Sets KubeMQ and disables observability metrics exporting  
              value: 'false'  
            - name: METRICS_TRACING_SAMPLE # Sets KubeMQ tracing sample probability as a percentage, i.e 0.1 =10%  
              value: '0.1'   
            - name: METRICS_HONEYCOMB_ENABLE  # Enable/Disable Honeycomb exporting 
              value: 'true'  
            - name: METRICS_HONEYCOMB_KEY # Sets Honeycomb's key
              value: 'key'   
            - name: METRICS_HONEYCOMB_DATASET # Sets Honeycomb's dataset
              value: 'dataset'  
           image: 'kubemq/kubemq:latest'
....        
```

</template>

<template v-slot:google>

Add the following environment variables to KubeMQ's stateful set yaml definition

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: METRICS_DISABLE  # Sets KubeMQ and disables observability metrics exporting  
              value: 'false'  
            - name: METRICS_TRACING_SAMPLE # Sets KubeMQ tracing sample probability as a percentage, i.e 0.1 =10%  
              value: '0.1'   
            - name: METRICS_STACKDRIVER_ENABLE # Enable/Disable Stack Driver exporting 
              value: 'true'  
            - name: METRICS_STACKDRIVER_PROJECT_ID
              value: 'Your Product ID'  # Sets StackDriver project id 
            - name: METRICS_STACKDRIVER_MONITOR_CRDES # Sets StackDriver monitor(stats)credentials file location
              value: 'Your Monitor Creds File'  
            - name: METRICS_STACKDRIVER_TRACE_CREDS # Sets StackDriver traces credentials file location
              value: 'Your Trace Creds File'  
          image: 'kubemq/kubemq:latest'
....        
```

</template>

<template v-slot:amazon>

Add the following environment variables to KubeMQ's stateful set yaml definition

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: METRICS_DISABLE  # Sets KubeMQ and disables observability metrics exporting  
              value: 'false'  
            - name: METRICS_TRACING_SAMPLE # Sets KubeMQ tracing sample probability as a percentage, i.e 0.1 =10%  
              value: '0.1'   
            - name: METRICS_AWS_ENABLE  # Enable/Disable AWS X-RAY exporting 
              value: 'true'  
            - name: METRICS_AWS_ACCESS_KEY_ID # Sets AWS access key id environment variable
              value: 'aws access key id'   
            - name: METRICS_AWS_SECRET_ACCESS_KEY # Sets AWS secret access key environment variable
              value: 'aws secret access key'  
            - name: METRICS_AWS_DEFAULT_REGION # Sets AWS default region environment variable
              value: 'aws default region'  
          image: 'kubemq/kubemq:latest'
....        
```

</template>

<template v-slot:datadog>


Add the following environment variables to KubeMQ's stateful set yaml definition

``` yaml
...
        - env:
            - name: KUBEMQ_TOKEN
              value: <YOUR-KUBEMQ-TOKEN>
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
            - name: STORE_DIR
              value: '/store'
            - name: METRICS_DISABLE  # Sets KubeMQ and disables observability metrics exporting  
              value: 'false'  
            - name: METRICS_TRACING_SAMPLE # Sets KubeMQ tracing sample probability as a percentage, i.e 0.1 =10%  
              value: '0.1'   
            - name: METRICS_DATADOG_ENABLE # Enable/Disable Datadog exporting 
              value: 'true'  
            - name: METRICS_DATADOG_TRACE_ADDRESS  # Sets Datadog's trace address 
              value: 'datadog trace address' 
            - name: METRICS_DATADOG_STATS_ADDRESS # Sets Datadog's stats address
              value: 'datadog stats address'  
          image: 'kubemq/kubemq:latest'
....        
```

</template>

</CodeSwitcher>

