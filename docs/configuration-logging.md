# Logging

KubeMQ supports in addition to docker stdout logging sending logs to `local files` and to [Logly](https://www.loggly.com/) external service.

| Environment Variable     | Type   | Default    | Description                                                                      |
|:-------------------------|:-------|:-----------|:---------------------------------------------------------------------------------|
| LOG_FILE_ENABLE          | bool   | `false`    | Enable/Disable saving logs to file                                               |
| LOG_FILE_PATH            | string | `./log`    | Sets docker container explicit host name                                      |
| LOG_LOGGLY_ENABLE         | bool   | `false`    | Enable/Disable sensing logs to [Logly](https://www.loggly.com/) external service |
| LOG_LOGGLY_KEY            | string | No Default | Logly access key                                                                 |
| LOG_LOGGLY_FLUSH_INTERVAL | int    | 5          | Logly sending logs interval in seconds                                           |

