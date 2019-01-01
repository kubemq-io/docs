---
title: "gRPC Interface"
draft: false
weight: 43
date: 2017-10-17T15:26:15Z
lastmod: 2018-12-05T15:26:15Z
---
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

