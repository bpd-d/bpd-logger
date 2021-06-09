export declare type LogProperty = string | (() => string) | undefined;
export declare type MeasureCallbackType<T> = (() => T) | Promise<T>;
export interface Log {
    props: Map<string, LogProperty>;
    timestamp: Date;
    level: LogLevel;
    error?: Error | string;
}
export declare const PROPERTIES: {
    MESSAGE: string;
    ID: string;
    MODULE: string;
    METHOD: string;
    PERFORFMANCE: string;
};
export interface LoggerMeasureOptions {
    label?: string;
    fraction?: number;
    rethrow?: boolean;
}
export interface LoggerReporter {
    (logObj: Log): Promise<boolean>;
}
export interface LoggerExtension {
    (): [string, LogProperty];
}
export declare type LogLevel = "debug" | "info" | "warn" | "error" | "exception" | "none";
export interface LoggerSetup {
    reporters?: LoggerReporter[];
    extensions?: LoggerExtension[];
}
export interface ISetupBuilder {
    /**
     * Sets logging level in setup
     * @param {LogLevel} level
     * @returns new bulder instance with changed logging level
     */
    withLevel(level: LogLevel): ISetupBuilder;
    /**
     * Sets reporters on in setup
     * NOTE: Reporters are added to existing
     * @param {LoggerReporter[]} reporters list of reporters
     * @returns new instance of bulder
     */
    withReporters(...reporters: LoggerReporter[]): ISetupBuilder;
    /**
     * Adds extensions to setup
     * @param {LoggerExtension} extensions list of extensions
     * @returns new instance of bulder
     */
    withExtensions(...extensions: LoggerExtension[]): ISetupBuilder;
    /**
     * Clears list of reporters in setup
     * @returns new instance of bulder
     */
    clearReporters(): ISetupBuilder;
    /**
     * Clears list of extensions
     * @returns new instance of bulder
     */
    clearExtensions(): ISetupBuilder;
    /**
     * Spawns new instance of logger with updated setup
     * @returns
     */
    save(): Logger;
}
export interface Logger {
    /**
     * Sets an id property
     * @param {string} id - any identifier string
     * @returns new instance with id property
     */
    id: (id: string) => Logger;
    /**
     * Sets an module property
     * @param {string} module - any module string
     * @returns new instance with module property
     */
    module: (moduleName: string) => Logger;
    /**
     * Sets an method name property
     * @param {string} method - any method string
     * @returns new instance with method property
     */
    method: (fName: string) => Logger;
    /**
     * Sets any property
     * @param {string} prop property name
     * @param {LogProperty} value property value
     * @returns new logger instance
     */
    prop: (prop: string, value: LogProperty) => Logger;
    /**
     * Creates a configuration builder
     * @param {LoggerSetup} newSetup (optional)
     * @returns setup builder instance
     */
    configure: (setup?: LoggerSetup) => ISetupBuilder;
    /**
     * Logs message on debug level
     * @param {string} message
     * @returns new Logger instance
     */
    debug: (message?: LogProperty) => Promise<boolean>;
    /**
     * Logs message on info level
     * @param {string} message
     * @returns new Logger instance
     */
    info: (message?: LogProperty) => Promise<boolean>;
    /**
     * Logs message on warn level
     * @param {string} message
     * @returns new Logger instance
     */
    warn: (message?: LogProperty) => Promise<boolean>;
    /**
     * Logs message on error level
     * @param {string} message
     * @returns new Logger instance
     */
    error: (message?: LogProperty) => Promise<boolean>;
    /**
     * Logs message on exception level
     * @param {string} message
     * @returns new Logger instance
     */
    exception: (error: Error | string) => Promise<boolean>;
    /**
     * Logs message on specific level
     * @param {LogLevel} logLevel level that messsage shall be logged on
     * @param {string} message
     * @param {Error} error (optional) in case of an exception
     * @returns
     */
    measure: <T>(callback: MeasureCallbackType<T>, options?: LoggerMeasureOptions) => Promise<T | null>;
    /**
     * Logs message on specific level
     * @param {LogLevel} logLevel level that messsage shall be logged on
     * @param {string} message
     * @param {Error} error (optional) in case of an exception
     * @returns
     */
    log: (level: LogLevel, message?: LogProperty, error?: Error | string) => Promise<boolean>;
}
/**
 * Checks whether coming message log level matches level set in library
 * @param {LogLevel} level - current log level
 * @param {LogLevel} systemLevel - log level set in library
 * @returns whether current log level matches system level
 */
export declare function matchesLevel(level: LogLevel, systemLevel: LogLevel): boolean;
/**
 * Parses log property into string
 * @param {LogProperty} prop - log property
 * @returns
 */
export declare function parseLogProperty(prop: LogProperty): string | undefined;
/**
 * Creates a logger setup builder
 * @param {LoggerSetup} initSetup - initial logger setup
 * @param {Map<string, LogProperty>} props - logger properties
 * @param {LogLevel} level - logging level
 * @returns new builder instance
 */
export declare function getSetupBuilder(initSetup: LoggerSetup, props: Map<string, LogProperty>, level: LogLevel): ISetupBuilder;
/**
 * Creates new logger instance
 * @param {LoggerSetup} setup
 * @param {Map<string, LogProperty>} init
 * @param {LogLevel} level
 * @returns New instance of logger
 */
export declare function getLogger(setup: LoggerSetup, init: Map<string, LogProperty>, level: LogLevel): Logger;
declare const logger: Logger;
export default logger;
