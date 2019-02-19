## Persistence Configuration

The KubeMQ persistence (Events Store) configuration can be set as below:

| Environment Variable       | Type   | Default   | Description                                                                           |
|:---------------------------|:-------|:----------|:--------------------------------------------------------------------------------------|
| STORE_CLEAN                | bool   | false     | true=KubeMQ will clean all the files in the store on boot                                     |
| STORE_DIR                  | string | `./store` | Sets KubeMQ persistence folder                                                        |
| STORE_MAX_QUEUES           | int    | `0`       | Sets KubeMQ limit of the number of persistent channels/queues, 0 = unlimited                 |
| STORE_MAX_SUBSCRIBERS      | int    | `0`       | Sets KubeMQ limit of the number of subscribers per channel/queue, 0 = unlimited              |
| STORE_MAX_MESSAGES         | int    | `0`       | Sets KubeMQ limit of the number of stored messages per channel/queue, 0 = unlimited          |
| STORE_MAX_SIZE             | int    | `0`       | Sets KubeMQ max size in bytes per channel/queue, 0 = unlimited                        |
| STORE_MAX_RETENTION        | int    | `1440`    | Sets KubeMQ store time in minutes for each message per channel/queue, 0 = infinite |
| STORE_MAX_INACTIVITY_PURGE | int    | `14401    | Sets KubeMQ delete channel/queue due to inactivity time in minutes, 0 = no purging    |


