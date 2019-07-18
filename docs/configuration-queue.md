## Queue Configuration

The KubeMQ persistence (Events Store) configuration can be set as below:

| Environment Variable               | Type | Default | Description                                                                                       |
|:-----------------------------------|:-----|:--------|:--------------------------------------------------------------------------------------------------|
| QUEUE_MAX_NUMBER_OF_MESSAGE        | int  | `1024`  | Sets max of sending / receiving batch of queue messages, default 1024, 0 is unlimited             |
| QUEUE_MAX_WAIT_TIMEOUT_SECONDS     | int  | `3600`  | Sets max expiration allowed for message, default 43200 seconds, 12 hours                          |
| QUEUE_MAX_EXPIRATION_SECONDS       | int  | `43200` | Sets max expiration allowed for message, default 43200 seconds, 12 hours                          |
| QUEUE_MAX_DELAY_SECONDS            | int  | `43200` | Sets max delay seconds allowed for message, default 43200 seconds, 12 hours                       |
| QUEUE_MAX_RECEIVE_COUNT            | int  | `16`    | Sets max retires to receive message before discard, default 16 times                              |
| QUEUE_MAX_VISIBILITY_SECONDS       | int  | `43200` | Sets max time of hold received message before returning to queue, default 43200 seconds, 12 hours |
| QUEUE_DEFAULT_VISIBILITY_SECONDS   | int  | `60`    | Sets default time of hold received message before returning to queue, default 60 seconds          |
| QUEUE_DEFAULT_WAIT_TIMEOUT_SECONDS | int  | `1`     | Sets default time to wait for a message in a queue, default 1 second                              |


