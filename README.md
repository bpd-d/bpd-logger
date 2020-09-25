# bpd-logger
Simple logger implementation with support for plugins.

# Usage
## Log levels

Library provides 5 logging levels:
* DEBUG - Logs all the messages
* INFO
* WARNING
* ERROR
* EXCEPTION - lowest level, logs only exceptions

## Configuration

To configure logger factory, it is enough to initialize it from main logger module and attach it to window or root:

```
let logger = new BpdLogger(setup);
```

where setup is an object which provides log level and list of plugins. Optionally advanced users can provide implementation of Plugin manager:

```
let setup = {
    level: "DEBUG",
    plugins: [new ConsoleLoggerPlugin()]
}
```

## Usage

Use logger instance to get module instance for classes/modules etc:

```
logger.get("ModuleName");
```

Instances are cached so if **get** is called mulitple times with the same module name it returns reference to the same object;

## Module logger

Module logger is an instance returned by method **get**. Object exposes direct logging methods: exception, error, warning, info, debug
Also gives an additional property **id** which is also passed to logger (and in case of console logger for example displayed in console).
It can be set by **setId** method.

Each of the logging methods requires message to be passed to logger and provides optional field for name of the function. Method **exception** also requires error object:

```
debug(message: string, functionName?: string): void;
info(message: string, functionName?: string): void;
warning(message: string, functionName?: string): void;
error(message: string, functionName?: string): void;
exception(e: Error, message: string, functionName?: string): void;
```

# SDK

Library gives a bit of a flexibility for developers who require more advanced logging solutions.

## Plugins
It is possible to define new logging plugins - it can be done by implementing an interface **IBpdLoggerPlugin**:
```
interface IBpdLoggerPlugin {
    log: (level: BpdLogLevel, data: LogDetails) => void;
}
```

method **log** is invoked by plugin manager, it required to properties: level which is a logging level and data which keeps log data:
```
interface LogDetails {
    message: string;
    date: Date;
    error?: Error;
    function?: string;
    id?: string;
    module?: string;
}
```
From this point it is up to implementer what to do with this information.

## Manager
It is not recomended, but if default plugin manager is not sufficient, it is possible to implement own manager.
It shall implement interface **IBpdPluginManager** and be passed in **setup** object during logger initialization.
```
interface IBpdPluginManager {
    onLog(level: BpdLogLevel, data: LogDetails): void;
    setPlugins(plugins: IBpdLoggerPlugin[]): void;
}
```
Interface exposes two methods. **setPlugins** is used by the logger to pass list of plugins, second one **onLog** is invoked the module loggers - each module logger instance keeps reference to plugin manager.