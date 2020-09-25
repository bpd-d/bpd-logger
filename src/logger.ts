interface LoggerCache {
    [id: string]: BpdModuleLoggerBase;
}

interface LogCallback {
    (level: BpdLogLevel, data: LogDetails): void;
}

export type BpdLogLevel = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "EXCEPTION";

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

export abstract class BpdModuleLoggerBase {
    #module: string;
    manager: IBpdPluginManager;
    constructor(module: string, manager: IBpdPluginManager) {
        this.#module = module;
        this.manager = manager;
    }

    protected log(level: BpdLogLevel, id: string, message: string, functionName: string | undefined, error?: Error | undefined) {
        this.manager.onLog(level, {
            message: message,
            date: new Date(),
            function: functionName,
            id: id,
            error: error,
            module: this.#module
        });
    }

    abstract debug(message: string, functionName?: string): void;
    abstract error(message: string, functionName?: string): void;
    abstract warning(message: string, functionName?: string): void;
    abstract exception(e: Error, message: string, functionName?: string): void;
    abstract info(message: string, functionName?: string): void;
    abstract setId(id: string): void;
}

export class BpdModuleLogger extends BpdModuleLoggerBase {
    #id: string;
    constructor(module: string, manager: IBpdPluginManager) {
        super(module, manager);
        this.#id = "-";
    }

    debug(message: string, functionName?: string): void {
        this.log("DEBUG", this.#id, message, functionName)
    }

    error(message: string, functionName?: string): void {
        this.log("ERROR", this.#id, message, functionName)
    }

    warning(message: string, functionName?: string): void {
        this.log("WARNING", this.#id, message, functionName)
    }

    info(message: string, functionName?: string): void {
        this.log("INFO", this.#id, message, functionName)
    }

    exception(e: Error, message: string, functionName?: string): void {
        this.log("EXCEPTION", this.#id, message, functionName, e);
    }

    setId(id: string): void {
        this.#id = id;
    }
}

export interface IBpdPluginManager {
    onLog: LogCallback;
    setPlugins(plugins: IBpdLoggerPlugin[]): void;
}


export interface IBpdLoggerPlugin {
    log: LogCallback;
}

export class BpdLogger {
    #level: BpdLogLevel;
    #cache: LoggerCache;
    #manager: IBpdPluginManager;
    #plugins: IBpdLoggerPlugin[];
    constructor(setup?: BpdLoggerSetup) {
        this.#manager = new PluginsManager("ERROR");
        this.#plugins = [];
        this.#level = "ERROR";
        this.setSetup(setup);
        this.#cache = {};
        this.#manager.setPlugins(this.#plugins);

    }

    get(module: string): BpdModuleLoggerBase {
        if (!module || module === null && module === "") {
            throw new Error("Module name has not been provided");
        }
        let moduleLogger = this.#cache[module];
        if (!moduleLogger) {
            moduleLogger = new BpdModuleLogger(module, this.#manager);
            this.#cache[module] = moduleLogger;
        }
        return moduleLogger;
    }

    private setSetup(setup?: BpdLoggerSetup) {
        if (setup && setup !== null) {
            this.#level = setup.level ?? "ERROR";
            this.#plugins = setup.plugins ?? [];
            this.#manager = setup.manager ?? new PluginsManager(this.#level);
        }
    }
}

export class PluginsManager implements IBpdPluginManager {
    #plugins: IBpdLoggerPlugin[];
    #level: BpdLogLevel;
    constructor(level: BpdLogLevel) {
        this.#plugins = [];
        this.#level = level;
    }

    setPlugins(plugins: IBpdLoggerPlugin[]) {
        this.#plugins = plugins ?? [];
    }

    onLog(level: BpdLogLevel, data: LogDetails) {
        if (!this.levelMatch(level)) {
            return;
        }
        this.#plugins.forEach(plugin => {
            plugin.log(level, data);
        })
    }

    private levelMatch(level: BpdLogLevel): boolean {
        if (this.#plugins.length === 0) {
            return false;
        }
        if (this.#level === "DEBUG" || this.#level === level) {
            return true;
        }
        switch (this.#level) {
            case "INFO":
                return level !== "DEBUG";
            case "WARNING":
                return !["DEBUG", "INFO"].includes(level);
            case "ERROR":
                return ["ERROR", "EXCEPTION"].includes(level)
            case "EXCEPTION":
                return level === 'EXCEPTION';
            default:
                return false;
        }
    }
}