(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{180:function(t,e,a){"use strict";a.r(e);var i=a(0),s=Object(i.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("p",[t._v("The core functionality of KubeMQ messaging are sending and receiving messages.")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),a("p",[t._v("KubeMQ Channel (Topic/Subject/Address/Destination) is a string base representation of an endpoint or a target of a message.\nKubeMQ supports "),a("a",{attrs:{href:"https://nats.io/documentation/writing_applications/subjects/",target:"_blank",rel:"noopener noreferrer"}},[t._v("NATS.IO"),a("OutboundLink")],1),t._v(" Subject-based Messaging patterns for hierarchies, wildcards and tokens.")]),t._v(" "),t._m(4),t._v(" "),a("p",[t._v("Channel string can formed from any UTF-8 characters with the following attributes:")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),a("p",[t._v("One level hierarchy:")]),t._v(" "),t._m(8),t._v(" "),a("p",[t._v("Two levels hierarchy:")]),t._v(" "),t._m(9),t._v(" "),a("p",[t._v("N levels hierarchy:")]),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),a("p",[t._v("Matching single token in any hierarchy")]),t._v(" "),t._m(14),t._v(" "),a("p",[t._v("Matching one or more tokens at the tail of a channel")]),t._v(" "),a("p",[t._v("Examples:")]),t._v(" "),a("p",[t._v("Here some examples for channel subscription patterns and which types of messages with channels are accepted and ignored.")]),t._v(" "),t._m(15),t._v(" "),t._m(16),t._v(" "),a("p",[t._v("KubeMQ supports grouping receivers with the same subscription channel patterns to form a load balancing group. Group pattern is useful pattern for sharing messages loads handling between services and for redundancy functionality as well.")]),t._v(" "),a("p",[t._v("During Subscription request, the receiver can set group name to join or not. Based on Group value setting KubeMQ will deliver messages to the receiver as follows:")]),t._v(" "),t._m(17),t._v(" "),a("p",[t._v("Example:")]),t._v(" "),a("p",[t._v("In the table below we have 8 receivers which subscribe to different channels and groups:")]),t._v(" "),t._m(18),t._v(" "),a("p",[t._v("In the table below we explore several messages channels and which receiver will get them:")]),t._v(" "),t._m(19)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"senders-and-receivers"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#senders-and-receivers","aria-hidden":"true"}},[this._v("#")]),this._v(" Senders and Receivers")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Senders")]),this._v(" (publishers) can send one or many messages (stream) to a specific one destination (Channel).\nSending message not require to set up any pre-define destination.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Receiver")]),this._v(" (subscribers/listeners) can receive messages from one or more senders on the same channel or wildcards channel.\nBefore a Receiver can receive amy messages, a Subscription function is needed to register his interest to receive messages from senders designations.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"channel"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#channel","aria-hidden":"true"}},[this._v("#")]),this._v(" Channel")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"format"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#format","aria-hidden":"true"}},[this._v("#")]),this._v(" Format")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[t._v("Case sensitive, FOO and foo are different channel names")]),t._v(" "),a("li",[t._v("No white spaces allowed")]),t._v(" "),a("li",[t._v("Cannot be Blank ("),a("code",[t._v('""')]),t._v(")")]),t._v(" "),a("li",[a("code",[t._v(".")]),t._v(", "),a("code",[t._v("*")]),t._v(", "),a("code",[t._v(">")]),t._v(" are spacial chars for token hierarchies.")]),t._v(" "),a("li",[t._v("Cannot start with "),a("code",[t._v(".")])]),t._v(" "),a("li",[t._v("Can start with "),a("code",[t._v(">")]),t._v(" or "),a("code",[t._v("*")]),t._v(" (for subscription receivers only)")]),t._v(" "),a("li",[t._v("Unlimited hierarchies")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"hierarchies"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hierarchies","aria-hidden":"true"}},[this._v("#")]),this._v(" Hierarchies")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Channels names can be separated by "),e("code",[this._v(".")]),this._v(" symbol to create messaging streams hierarchies.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("foo")]),this._v(", "),e("code",[this._v("USA")]),this._v(", "),e("code",[this._v("org")]),this._v(" are valid one level hierarchy.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("foo.bar")]),this._v(", "),e("code",[this._v("USA.NewYork")]),this._v(", "),e("code",[this._v("org.department")]),this._v(" are valid two levels hierarchy.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("foo.bar.A.B.C.>")]),this._v(" is valid n (n=6) levels hierarchy.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"wildcards"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#wildcards","aria-hidden":"true"}},[this._v("#")]),this._v(" Wildcards")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("KubeMQ supports two wildcards, "),e("code",[this._v("*")]),this._v(" and "),e("code",[this._v(">")]),this._v(". Wildcards are used to subscribe to a group of channels strings.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h5",{attrs:{id:"asterisk"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#asterisk","aria-hidden":"true"}},[this._v("#")]),this._v(" Asterisk "),e("code",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h5",{attrs:{id:"greater"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#greater","aria-hidden":"true"}},[this._v("#")]),this._v(" Greater "),e("code",[this._v(">")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Channel Pattern")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Messages Accepted")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Messages Ignored")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("bar")]),t._v(","),a("code",[t._v("zoo")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.*")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.bar")]),t._v(","),a("code",[t._v("foo.ZOO")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo")]),t._v(","),a("code",[t._v("foo.bar.zoo")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.bar.zoo")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.*.*.bar")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.a.b.bar")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.bar.zoo")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo*.>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.bar")]),t._v(",foo1.bar"),a("code",[t._v("|")]),t._v("foo`")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}})]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v(">")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("any message")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("none")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"group-load-balancing"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#group-load-balancing","aria-hidden":"true"}},[this._v("#")]),this._v(" Group (Load Balancing)")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v('Any receiver without group setting (group="", blank)')]),this._v(" "),e("li",[this._v("Only one receiver for each group he belong to")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Receiver Name")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Channel")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Group")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("R1")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v('""')])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("R2")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("g1")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("R3")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("g1")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("R4")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.*")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("g2")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("R5")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.*")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("g2")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("R6")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v(">")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("w1")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("R7")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("*")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v('""')])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("R8")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.bar")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v('""')])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Sending Message to Channel")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Receivers")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("R6,R7")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.bar")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("R1, R2 or R3, R4 or R5, R6,R8")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("foo.bar.zoo")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("R1, R2 or R3, R6,R8")])])])])}],!1,null,null,null);s.options.__file="concepts-terminology.md";e.default=s.exports}}]);