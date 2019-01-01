# Interfaces / Endpoints
KubeMQ has 3 exported endpoints, gRPC, Rest/Websocket and API.

## gRPC
KubeMQ main endpoint is gRPC server.

KubeMQ gRPC server is enabled by default and can be disabled by setting environment variable `GRPC_ENABLE=false`.

KubeMQ gRPC embedded server expose port 50000 by default and can be set via environment variable `GRPC_PORT`.

kubeMQ gRPC can secured by providing TLS certification and key.

Setting gRPC TLS secured server via the following environment variables:

 - `GRPC_SECURITY_TLS_MODE=tls`
 - `GRPC_SECURITY_CERT_FILE=cert_file_location`
 - `GRPC_SECURITY_KEY_FILE=key_file_location`

::: tip NOTE
gRPC endpoint has additional configuration settings. please refer to the Configuration section.
:::
## Rest/WebSocket

KubeMQ secondary endpoint is Rest/Websocket server.

KubeMQ Rest/Websocket server is enabled by default and can be disabled by setting environment variable `REST_ENABLE=false`.

KubeMQ Rest/Websocket server expose port 9090 by default and can be set via environment variable `REST_PORT`.

kubeMQ Rest/Websocket can secured by providing TLS certification and key.

Setting Rest/Websocket TLS secured server via the following environment variables:

 - `REST_SECURITY_TLS_MODE=tls`
 - `REST_SECURITY_CERT_FILE=cert_file_location`
 - `REST_SECURITY_KEY_FILE=key_file_location`

::: tip NOTE
Rest/Websocket endpoint has additional configuration settings. please refer to the Configuration section
:::


### API

KubeMQ expose API endpoint at port 8080. This port can be change by setting the environment variable `KUBEMQ_PORT`

