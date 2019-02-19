## Cluster Configuration
The KubeMQ cluster configuration can be set as below:

| Environment Variable | Type   | Default       | Description                                                        |
|:---------------------|:-------|:--------------|:-------------------------------------------------------------------|
| CLUSTER_ENABLE       | bool   | false         | Sets the KubeMQ clustering mode                                        |
| CLUSTER_ID           | string | `kubemq`      | Sets the KubeMQ cluster id as it is set in the kubernetes stateful set        |
| CLUSTER_PORT         | int    | `5228`        | Sets the KubeMQ cluster listening port                                 |
| CLUSTER_IS_SEED      | bool   | `false`       | Sets the current KubeMQ node as the seed (when not running as the stateful set |
| CLUSTER_ROUTES       | string | `kubemq:5228` | Sets the address of other KubeMQ nodes forming a cluster               |

