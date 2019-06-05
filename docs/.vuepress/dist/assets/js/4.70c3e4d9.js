(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{187:function(e,t,n){"use strict";n.r(t);var i=n(0),_=Object(i.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("h2",{attrs:{id:"endpoints"}},[e._v("Endpoints")]),e._v(" "),n("p",[e._v("KubeMQ has 3 exported endpoints, gRPC, Rest/Websocket, and API.")]),e._v(" "),n("h3",{attrs:{id:"grpc"}},[e._v("gRPC")]),e._v(" "),n("p",[e._v("KubeMQ’s main endpoint is gRPC server.")]),e._v(" "),n("p",[e._v("The KubeMQ gRPC server is enabled by default and can be disabled by setting environment variable "),n("code",[e._v("GRPC_ENABLE=false")]),e._v(".")]),e._v(" "),n("p",[e._v("The KubeMQ gRPC embedded server exposes port 50000 by default and can be set via environment variable "),n("code",[e._v("GRPC_PORT")]),e._v(".")]),e._v(" "),n("p",[e._v("kubeMQ gRPC can secured by providing TLS certification and key.")]),e._v(" "),n("p",[e._v("Setting the gRPC TLS secured server via the following environment variables:")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("GRPC_SECURITY_TLS_MODE=tls")])]),e._v(" "),n("li",[n("code",[e._v("GRPC_SECURITY_CERT_FILE=cert_file_location")])]),e._v(" "),n("li",[n("code",[e._v("GRPC_SECURITY_KEY_FILE=key_file_location")])])]),e._v(" "),n("p",[n("strong",[e._v("Note:")]),e._v(" The gRPC endpoint has additional configuration settings. Please refer to the Configuration section.")]),e._v(" "),n("h3",{attrs:{id:"rest-websocket"}},[e._v("Rest/WebSocket")]),e._v(" "),n("p",[e._v("The KubeMQ secondary endpoint is the Rest/Websocket server.")]),e._v(" "),n("p",[e._v("The KubeMQ Rest/Websocket server is enabled by default and can be disabled by setting environment variable "),n("code",[e._v("REST_ENABLE=false")]),e._v(".")]),e._v(" "),n("p",[e._v("The KubeMQ Rest/Websocket server exposes port 9090 by default and can be set via environment variable "),n("code",[e._v("REST_PORT")]),e._v(".")]),e._v(" "),n("p",[e._v("The kubeMQ Rest/Websocket can secured by providing the TLS certification and key.")]),e._v(" "),n("p",[e._v("Setting the Rest/Websocket TLS secured server via the following environment variables:")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("REST_SECURITY_TLS_MODE=tls")])]),e._v(" "),n("li",[n("code",[e._v("REST_SECURITY_CERT_FILE=cert_file_location")])]),e._v(" "),n("li",[n("code",[e._v("REST_SECURITY_KEY_FILE=key_file_location")])])]),e._v(" "),n("p",[n("strong",[e._v("Note:")]),e._v(" The Rest/Websocket endpoint has additional configuration settings. Please refer to the Configuration section.")]),e._v(" "),n("h3",{attrs:{id:"api"}},[e._v("API")]),e._v(" "),n("p",[e._v("KubeMQ exposes the API endpoint at port 8080. This port can be changed by setting the environment variable "),n("code",[e._v("KUBEMQ_PORT")])])])}],!1,null,null,null);_.options.__file="concepts-endpoints.md";t.default=_.exports}}]);