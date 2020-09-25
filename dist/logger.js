(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpd-logger", [], factory);
	else if(typeof exports === 'object')
		exports["bpd-logger"] = factory();
	else
		root["bpd-logger"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BpdModuleLoggerBase", function() { return BpdModuleLoggerBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BpdModuleLogger", function() { return BpdModuleLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BpdLogger", function() { return BpdLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginsManager", function() { return PluginsManager; });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _module, _id, _level, _cache, _manager, _plugins, _plugins_1, _level_1;
class BpdModuleLoggerBase {
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
class BpdModuleLogger extends BpdModuleLoggerBase {
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
class BpdLogger {
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
class PluginsManager {
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=logger.js.map