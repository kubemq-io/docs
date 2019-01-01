# Interfaces

## gRPC
KubeMQ GRPC interface configuration can be set as below:

| Environment Variable    | Type   | Default   | Description                                                    |
|:------------------------|:-------|:----------|:---------------------------------------------------------------|
| GRPC_ENABLE             | bool   | `true`    | Enable/Disable gRPC interface                                  |
| GRPC_PORT               | int    | `50000`   | Docker exposed port                                            |
| GRPC_SECURITY_TLS_MODE  | string | `none`    | `none` = no security, `tls` = TLS secured                      |
| GRPC_SECURITY_CERT_FILE | string | ``        | CERT file name and location                                    |
| GRPC_SECURITY_KEY_FILE  | string | ``        | Key file name and location                                     |
| GRPC_SUB_BUFF_SIZE      | int    | `100`     | Sets subscribe message / requests buffer size to use on server |
| GRPC_BODY_LIMIT         | int    | `4194304` | Sets request body limit in bytes (must be > 0)                 |

## REST
KubeMQ REST interface configuration can be set as below:

| Environment Variable        | Type          | Default           | Description                                                                                                                  |
|:----------------------------|:--------------|:------------------|:-----------------------------------------------------------------------------------------------------------------------------|
| REST_ENABLE                 | bool          | `true`            | Enable/Disable REST interface                                                                                                |
| REST_PORT                   | int           | `9090`            | Docker exposed port                                                                                                          |
| REST_SECURITY_TLS_MODE      | string        | `none`            | `none` = no security, `tls` = TLS secured                                                                                    |
| REST_SECURITY_CERT_FILE     | string        | ``                | CERT file name and location                                                                                                  |
| REST_SECURITY_KEY_FILE      | string        | ``                | Key file name and location                                                                                                   |
| REST_READ_TIMEOUT           | int           | `60`              | REST read timeout in seconds                                                                                                 |
| REST_WRITE_TIMEOUT          | int           | `60`              | REST write timeout in seconds                                                                                                |
| REST_SUB_BUFF_SIZE          | int           | `100`             | Sets subscribe message / requests buffer size to use on server                                                               |
| REST_BODY_LIMIT             | string        | ``                | Sets request body limit, (i.e. 2M), limit can be specified as 4x or 4xB, where x is one of the multiple from K, M, G, T or P |
| REST_CORS_ALLOW_ORIGINS     | strings array | `{*}`             | Sets a list of origins that may access the resource                                                                          |
| REST_CORS_ALLOW_METHODS     | strings array | `{"GET", "POST"}` | Sets a list of methods that may access the resource                                                                          |
| REST_CORS_ALLOW_HEADERS     | strings array | `{}`              | Sets a list of request headers that can be used when making the actual request                                               |
| REST_CORS_ALLOW_CREDENTIALS | bool          | `false`           | Sets whether or not the response to the request can be exposed when the credentials flag is true                             |
| REST_CORS_EXPOSE_HEADERS    | strings array | `{}`              | Sets a whitelist headers that clients are allowed to access                                                                  |
| REST_CORS_MAX_AGE           | int           | `0`               | Sets how long (in seconds) the results of a pre-flight request can be cached                                                 |

