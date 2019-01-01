# General
KubeMQ general configuration can be set as below:

| Environment Variable | Type   | Default             | Description                                                                                                                                    |
|:---------------------|:-------|:--------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| KUBEMQ_TOKEN         | string | No Default          | Sets KubeMQ token key                                                                                                                          |
| KUBEMQ_HOST          | string | container host name | Sets docker container explicit host name                                                                                                   |
| KUBEMQ_PORT          | int    | `8080`              | KubeMQ service API port for health, metrics and traces                                                                                         |
| KUBEMQ_LOG_LEVEL     | int    | `2`                 | Setting KubeMQ stdout log level where:  <ul><li>1 - Debug</li><li>2 - Info</li><li>3 - Warn</li><li>4 - Error</li></li><li>5 - Fatal</li></ul> |
