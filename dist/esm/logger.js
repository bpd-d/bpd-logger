var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _module, _id, _level, _cache, _manager, _plugins, _plugins_1, _level_1;
export class BpdModuleLoggerBase {
    constructor(module, manager) {
        _module.set(this, void 0);
        __classPrivateFieldSet(this, _module, module);
        this.manager = manager;
    }
    log(level, id, message, functionName, error) {
        this.manager.onLog(level, {
            message: message,
            date: new Date(),
            function: functionName,
            id: id,
            error: error,
            module: __classPrivateFieldGet(this, _module)
        });
    }
}
_module = new WeakMap();
export class BpdModuleLogger extends BpdModuleLoggerBase {
    constructor(module, manager) {
        super(module, manager);
        _id.set(this, void 0);
        __classPrivateFieldSet(this, _id, "-");
    }
    debug(message, functionName) {
        this.log("DEBUG", __classPrivateFieldGet(this, _id), message, functionName);
    }
    error(message, functionName) {
        this.log("ERROR", __classPrivateFieldGet(this, _id), message, functionName);
    }
    warning(message, functionName) {
        this.log("WARNING", __classPrivateFieldGet(this, _id), message, functionName);
    }
    info(message, functionName) {
        this.log("INFO", __classPrivateFieldGet(this, _id), message, functionName);
    }
    exception(e, message, functionName) {
        this.log("EXCEPTION", __classPrivateFieldGet(this, _id), message, functionName, e);
    }
    setId(id) {
        __classPrivateFieldSet(this, _id, id);
    }
}
_id = new WeakMap();
export class BpdLogger {
    constructor(setup) {
        _level.set(this, void 0);
        _cache.set(this, void 0);
        _manager.set(this, void 0);
        _plugins.set(this, void 0);
        __classPrivateFieldSet(this, _manager, new PluginsManager("ERROR"));
        __classPrivateFieldSet(this, _plugins, []);
        __classPrivateFieldSet(this, _level, "ERROR");
        this.setSetup(setup);
        __classPrivateFieldSet(this, _cache, {});
        __classPrivateFieldGet(this, _manager).setPlugins(__classPrivateFieldGet(this, _plugins));
    }
    get(module) {
        if (!module || module === null && module === "") {
            throw new Error("Module name has not been provided");
        }
        let moduleLogger = __classPrivateFieldGet(this, _cache)[module];
        if (!moduleLogger) {
            moduleLogger = new BpdModuleLogger(module, __classPrivateFieldGet(this, _manager));
            __classPrivateFieldGet(this, _cache)[module] = moduleLogger;
        }
        return moduleLogger;
    }
    setSetup(setup) {
        var _a, _b, _c;
        if (setup && setup !== null) {
            __classPrivateFieldSet(this, _level, (_a = setup.level) !== null && _a !== void 0 ? _a : "ERROR");
            __classPrivateFieldSet(this, _plugins, (_b = setup.plugins) !== null && _b !== void 0 ? _b : []);
            __classPrivateFieldSet(this, _manager, (_c = setup.manager) !== null && _c !== void 0 ? _c : new PluginsManager(__classPrivateFieldGet(this, _level)));
        }
    }
}
_level = new WeakMap(), _cache = new WeakMap(), _manager = new WeakMap(), _plugins = new WeakMap();
export class PluginsManager {
    constructor(level) {
        _plugins_1.set(this, void 0);
        _level_1.set(this, void 0);
        __classPrivateFieldSet(this, _plugins_1, []);
        __classPrivateFieldSet(this, _level_1, level);
    }
    setPlugins(plugins) {
        __classPrivateFieldSet(this, _plugins_1, plugins !== null && plugins !== void 0 ? plugins : []);
    }
    onLog(level, data) {
        if (!this.levelMatch(level)) {
            return;
        }
        __classPrivateFieldGet(this, _plugins_1).forEach(plugin => {
            plugin.log(level, data);
        });
    }
    levelMatch(level) {
        if (__classPrivateFieldGet(this, _plugins_1).length === 0) {
            return false;
        }
        if (__classPrivateFieldGet(this, _level_1) === "DEBUG" || __classPrivateFieldGet(this, _level_1) === level) {
            return true;
        }
        switch (__classPrivateFieldGet(this, _level_1)) {
            case "INFO":
                return level !== "DEBUG";
            case "WARNING":
                return !["DEBUG", "INFO"].includes(level);
            case "ERROR":
                return ["ERROR", "EXCEPTION"].includes(level);
            case "EXCEPTION":
                return level === 'EXCEPTION';
            default:
                return false;
        }
    }
}
_plugins_1 = new WeakMap(), _level_1 = new WeakMap();
