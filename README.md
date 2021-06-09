# bpd-logger

Simple logger implementation with support for plugins.

## Logging levels

Library supports following logging levels

-   none - (default) - nothing is reported
-   exception - only exceptions are reported (Error objects)
-   error - reports error messages and exceptions
-   warn - reports warning and error messages and exceptions
-   info - reports messages, warnings, errors and exceptions
-   debug - reports all messages

## Reporters

Reporters are needed to post log messages to some destination - it can be anything from console to API endpoint.
Library provides simple implementation of console reporter.

Object passed to reporter is an instance of `Log` which specify message log level, log properties, date and optionally error object

Example reporter:

```javascript
async function LogReporter(log: Log) {
	console.log(log);
	return true;
}
```

## Extensions

Extensions are callbacks that are executed right before message is logged.
They return property name and it's value which is attached to **props** map in **Log** object.

Example extension:

```javascript
let count = 0;
function SampleExtension() {
	count += 1;
	return ["counter", count];
}
```

# Usage

Logger gathers fields set as props and pushes them along with message to reporters when user invokes one of **log** messages.
Properties can be added via method `prop`, special methods like `id`, `module`,`method` or by extensions (extension callbacks are executed every time before pushing log message to reporters).

## Configuration

With minimal effort you have to specify at least one reporter and logging level because by default logging level is set to **none**.
Logger can be configured via method `configure`. It returns builder which allows to prepare setup.
Builder exposes following methods:

-   `withLevel(level: LogLevel)` - sets logging level
-   `withReporters(...reporters: LoggerReporter[])` - adds reporters to the list
-   `withExtensions(...extensions: LoggerExtension[])` - adds extension to the list
-   `clearReporters()` - clears reporters list
-   `clearExtensions()` - clears extensions list
-   `save()` - spawns new logger instance with updated setup

## Methods

Logger exposes several methods:

-   `id(id: string)` - sets property `id`
-   `module(method: string)` - sets property `module`
-   `method(method: string)` - sets property `method`
-   `prop(key: string, value: LogProperty)` - sets any property by kay and value

> NOTE
>
> All of above methods return new instance of logger extended by property

-   `configure(setup?: LoggerSetup)` - returns object that lets to configure setup of logger. Object takes copy of logger props, so instance returned by configuration builder will get all data that has been filled before. More information can be found in section dedicated to configuration builder.

-   `debug(message: string)`,`info(message: string)`,`warn(message: string)`,`error(message: string)` - all methods are dedicated to logging a message. They fill proper log level and property **message**, then push it to reporter
-   `exception(e: Error | string)` - specific method that accepts **Error** object. It also pushes log to reporters along with message and error
-   `log(level: LogLevel, message?: string, error?: Error)` - common method for logging.

> NOTE
>
> Above methods return logging result

-   `measure(callback, options?)` - method measures callback execution time. It returns execution result (not a logging result) or null if method failed to execute. Measured result is transformed to a log. Method fills properties **message** and **performance**. It also logs out an exception log if case of callback failure. Method accepts functions and promises as callback property. Options are optional and may specify a **label** (default is _Performance_) displayed in log message, **fraction** which specifies fraction digit in method `toFixed` called on execution time, **rethrow** which specifies whether error thrown by callback shall be rethrown (instead of returning result of null).
