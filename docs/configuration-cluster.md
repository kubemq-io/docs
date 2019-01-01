# Cluster
 
KubeMQ cluster configuration can be set as below:

| Environment Variable | Type   | Default       | Description                                                        |
|:---------------------|:-------|:--------------|:-------------------------------------------------------------------|
| CLUSTER_ENABLE       | bool   | false         | Sets KubeMQ clustering mode                                        |
| CLUSTER_ID           | string | `kubemq`      | Sets KubeMQ cluster id as is set in kubernetes stateful set        |
| CLUSTER_PORT         | int    | `5228`        | Sets KubeMQ cluster listening port                                 |
| CLUSTER_IS_SEED      | bool   | `false`       | Sets current KubeMQ node as seed (when not running as stateful set |
| CLUSTER_ROUTES       | string | `kubemq:5228` | Sets address of other KubeMQ nodes forming a cluster               |
