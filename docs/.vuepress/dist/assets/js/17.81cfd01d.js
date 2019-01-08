(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{168:function(t,e,l){"use strict";l.r(e);var a=l(0),i=Object(a.a)({},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"content"},[l("h1",{attrs:{id:"helm-chart"}},[t._v("Helm Chart")]),t._v(" "),l("p",[t._v("KubeMQ cluster can be deployed by install "),l("a",{attrs:{href:"https://github.com/helm/charts",target:"_blank",rel:"noopener noreferrer"}},[t._v("Helm"),l("OutboundLink")],1),t._v(" chart.")]),t._v(" "),l("h2",{attrs:{id:"add-kubemq-helm-repository"}},[t._v("Add KubeMQ Helm Repository")]),t._v(" "),t._m(0),l("p",[t._v("Verify kubemq helm repository charts is properly configured by:")]),t._v(" "),t._m(1),l("h2",{attrs:{id:"install-kubemq-chart"}},[t._v("Install KubeMQ Chart")]),t._v(" "),l("p",[t._v("To install KubeMQ chart with the release name kubemq-release:")]),t._v(" "),t._m(2),l("h2",{attrs:{id:"uninstall-kubemq-chart"}},[t._v("Uninstall KubeMQ Chart")]),t._v(" "),l("p",[t._v("To uninstall/delete the kubemq-release deployment:")]),t._v(" "),t._m(3),l("h2",{attrs:{id:"configuration"}},[t._v("Configuration")]),t._v(" "),l("p",[t._v("The following table lists the configurable parameters of the KubeMQ chart and their default values.")]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._m(7)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("$ helm repo add kubemq-charts  https://kubemq-io.github.io/charts\n")])]),this._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[this._v("1")]),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("$ helm repo list\n")])]),this._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[this._v("1")]),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("$ helm install --name kubemq-release --set token={your kubemq token} kubemq-charts/kubemq \n")])]),this._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[this._v("1")]),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("$ helm delete kubemq-release\n")])]),this._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[this._v("1")]),e("br")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("table",[l("thead",[l("tr",[l("th",{staticStyle:{"text-align":"left"}},[t._v("Parameter")]),t._v(" "),l("th",{staticStyle:{"text-align":"left"}},[t._v("Default")]),t._v(" "),l("th",{staticStyle:{"text-align":"left"}},[t._v("Description")])])]),t._v(" "),l("tbody",[l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("nameOverride")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("kubemq-cluster")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets deployment name")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("token")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("``")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets KubeMQ token")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("replicaCount")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("3")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Number of KubeMQ nodes")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("cluster.enable")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("true")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Enable/Disable cluster mode")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("image.repository")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("kubemq/kubemq")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("KubeMQ image name")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("image.tag")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("latest")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("KubeMQ image tag")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("image.pullPolicy")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("Always")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Image pull policy")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("service.type")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("ClusterIP")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets KubeMQ service type")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("service.apiPort")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("8080")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets KubeMQ service Api Port")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("service.restPort")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("9090")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets KubeMQ service Rest Port")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("service.grpcPort")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("5000")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets KubeMQ service gRPC Port")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("service.clusterPort")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("5228")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets KubeMQ service Cluster Port")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("livenessProbe.enabled")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("true")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Enable/Disable liveness prob")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("livenessProbe.initialDelaySeconds")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("4")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Delay before liveness probe is initiated")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("livenessProbe.periodSeconds")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("10")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("How often to perform the probe")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("livenessProbe.timeoutSeconds")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("5")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("When the probe times out")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("livenessProbe.failureThreshold")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("6")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Minimum consecutive successes for the probe to be considered successful after having failed")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("livenessProbe.successThreshold")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("1")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Minimum consecutive failures for the probe to be considered failed after having succeeded")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("readinessProbe.enabled")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("true")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Enable/Disable readiness prob")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("readinessProbe.initialDelaySeconds")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("1")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Delay before readiness probe is initiated")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("readinessProbe.periodSeconds")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("10")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("How often to perform the probe")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("readinessProbe.timeoutSeconds")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("5")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("When the probe times out")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("readinessProbe.failureThreshold")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("6")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Minimum consecutive failures for the probe to be considered failed after having succeeded")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("readinessProbe.successThreshold")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("1")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Minimum consecutive successes for the probe to be considered successful after having failed")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("statefulset.updateStrategy")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("RollingUpdate")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Statefulsets Update strategy")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("volume.enabled")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("false")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Enable/Disable Persistence Volume Claim template")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("volume.size")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v("1Gi")])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Set volume size")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("volume.mountPath")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v('"/store"')])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets container mounting point")])]),t._v(" "),l("tr",[l("td",{staticStyle:{"text-align":"left"}},[t._v("volume.accessMode")]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[l("code",[t._v('"ReadWriteOnce"')])]),t._v(" "),l("td",{staticStyle:{"text-align":"left"}},[t._v("Sets Persistence access mode")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Specify each parameter using the "),e("code",[this._v("--set key=value[,key=value]")]),this._v(" argument to helm install. For example,")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("helm install --name kubemq-release --set token={your kubemq token},nameOverride=my-kubemq-cluster kubemq-charts/kubemq \n")])]),this._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[this._v("1")]),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Will install KubeMQ cluster with application name set to "),e("code",[this._v("my-kubemq-cluster")]),this._v(" .")])}],!1,null,null,null);i.options.__file="installation-helm.md";e.default=i.exports}}]);