interface LogCallback {
    (level: BpdLogLevel, data: LogDetails): void;
}
export declare type BpdLogLevel = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "EXCEPTION";
export interface BpdLoggerSetup {
    level: BpdLogLevel;
    plugins: IBpdLoggerPlugin[];
    manager?: IBpdPluginManager;
}
export interface LogDetails {
    message: string;
    date: Date;
    error?: Error;
    function?: string;
    id?: string;
    module?: string;
}
export declare abstract class BpdModuleLoggerBase {
    #private;
    manager: IBpdPluginManager;
    constructor(module: string, manager: IBpdPluginManager);
    protected log(level: BpdLogLevel, id: string, message: string, functionName: string | undefined, error?: Error | undefined): void;
    abstract debug(message: string, functionName?: string): void;
    abstract error(message: string, functionName?: string): void;
    abstract warning(message: string, functionName?: string): void;
    abstract exception(e: Error, message: string, functionName?: string): void;
    abstract info(message: string, functionName?: string): void;
    abstract setId(id: string): void;
}
export declare class BpdModuleLogger extends BpdModuleLoggerBase {
    #private;
    constructor(module: string, manager: IBpdPluginManager);
    debug(message: string, functionName?: string): void;
    error(message: string, functionName?: string): void;
    warning(message: string, functionName?: string): void;
    info(message: string, functionName?: string): void;
    exception(e: Error, message: string, functionName?: string): void;
    setId(id: string): void;
}
export interface IBpdPluginManager {
    onLog: LogCallback;
    setPlugins(plugins: IBpdLoggerPlugin[]): void;
}
export interface IBpdLoggerPlugin {
    log: LogCallback;
}
export declare class BpdLogger {
    #private;
    constructor(setup?: BpdLoggerSetup);
    get(module: string): BpdModuleLoggerBase;
    private setSetup;
}
export declare class PluginsManager implements IBpdPluginManager {
    #private;
    constructor(level: BpdLogLevel);
    setPlugins(plugins: IBpdLoggerPlugin[]): void;
    onLog(level: BpdLogLevel, data: LogDetails): void;
    private levelMatch;
}
export {};
