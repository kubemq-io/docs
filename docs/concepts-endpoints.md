## Endpoints
KubeMQ has 3 exported endpoints, gRPC, Rest/Websocket, and API.

### gRPC
KubeMQ’s main endpoint is gRPC server.

The KubeMQ gRPC server is enabled by default and can be disabled by setting environment variable `GRPC_ENABLE=false`.

The KubeMQ gRPC embedded server exposes port 50000 by default and can be set via environment variable `GRPC_PORT`.

kubeMQ gRPC can secured by providing TLS certification and key.

Setting the gRPC TLS secured server via the following environment variables:

 - `GRPC_SECURITY_TLS_MODE=tls`
 - `GRPC_SECURITY_CERT_FILE=cert_file_location`
 - `GRPC_SECURITY_KEY_FILE=key_file_location`

**Note:** The gRPC endpoint has additional configuration settings. Please refer to the Configuration section.

### Rest/WebSocket

The KubeMQ secondary endpoint is the Rest/Websocket server.

The KubeMQ Rest/Websocket server is enabled by default and can be disabled by setting environment variable `REST_ENABLE=false`.

The KubeMQ Rest/Websocket server exposes port 9090 by default and can be set via environment variable `REST_PORT`.

The kubeMQ Rest/Websocket can be secured by providing the TLS certification and key.

Setting the Rest/Websocket TLS secured server via the following environment variables:

 - `REST_SECURITY_TLS_MODE=tls`
 - `REST_SECURITY_CERT_FILE=cert_file_location`
 - `REST_SECURITY_KEY_FILE=key_file_location`

**Note:** The Rest/Websocket endpoint has additional configuration settings. Please refer to the Configuration section.

### API

KubeMQ exposes the API endpoint at port 8080. This port can be changed by setting the environment variable `KUBEMQ_PORT`


