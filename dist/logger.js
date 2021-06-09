(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdLogger", [], factory);
	else if(typeof exports === 'object')
		exports["bpdLogger"] = factory();
	else
		root["bpdLogger"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "PROPERTIES": () => (/* reexport */ PROPERTIES),
  "getLogger": () => (/* reexport */ getLogger),
  "getSetupBuilder": () => (/* reexport */ getSetupBuilder),
  "matchesLevel": () => (/* reexport */ matchesLevel),
  "parseLogProperty": () => (/* reexport */ logger_parseLogProperty)
});

;// CONCATENATED MODULE: ./src/logger.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const PROPERTIES = {
    MESSAGE: "message",
    ID: "id",
    MODULE: "module",
    METHOD: "method",
    PERFORFMANCE: "performance",
};
/**
 * Checks whether coming message log level matches level set in library
 * @param {LogLevel} level - current log level
 * @param {LogLevel} systemLevel - log level set in library
 * @returns whether current log level matches system level
 */
function matchesLevel(level, systemLevel) {
    if (level === systemLevel) {
        return true;
    }
    if (systemLevel === "debug") {
        return true;
    }
    if (systemLevel === "none") {
        return false;
    }
    const levelIdx = levels.findIndex((l) => l === level);
    const sysIdx = levels.findIndex((l) => l === systemLevel);
    return levelIdx <= sysIdx;
}
/**
 * Extends property map with props returned by extension
 * @param {Map<string, LogProperty>} map - property map
 * @param {LoggerExtension[]} extensions - logger extensions
 * @returns extended map
 */
function extendMap(map, extensions) {
    if (!extensions) {
        return map;
    }
    extensions.forEach((e) => map.set(...e()));
    return map;
}
/**
 * Pushes log object to reporters
 * @param {LogLevel} level - log message level
 * @param {Map<string, LogProperty>} props - log properties
 * @param {LoggerReporter[]} reporters - logger reporters
 * @param {Error} error - (optional) - exception object
 * @returns whether push succeeded or not
 */
function pushLog(level, props, reporters, error) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!reporters) {
            return false;
        }
        try {
            const timestamp = new Date();
            yield Promise.all(reporters.map((p) => p({
                props,
                timestamp,
                level,
                error,
            })));
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    });
}
/**
 * Merges two array into one
 * @param {T[]} arr1 - first array
 * @param {T[]} arr2 - second array
 * @returns new array
 */
function mergeArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}
/**
 *
 * @param array - {optional}
 * @returns array or empty array when it doesnt exist
 */
function getArray(array) {
    return array ? array : [];
}
function executeCallback(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = performance.now();
        const result = callback();
        return [performance.now() - start, result];
    });
}
function executePromise(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = performance.now();
        const result = yield callback;
        return [performance.now() - start, result];
    });
}
function executeMeasure(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof callback === "function") {
            return executeCallback(callback);
        }
        if (callback instanceof Promise) {
            return executePromise(callback);
        }
        return [0, callback];
    });
}
/**
 * Creates copy of setup object with new property set
 * @param {LoggerSetup} setup - setup object
 * @param {string} id - setup property key
 * @param {any} value - value to be set on the object
 * @returns new setup object
 */
function setOnSetup(setup, id, value) {
    return Object.assign(Object.assign({}, setup), { [id]: value });
}
/**
 * Parses log property into string
 * @param {LogProperty} prop - log property
 * @returns
 */
function logger_parseLogProperty(prop) {
    if (typeof prop === "function") {
        return prop();
    }
    return prop;
}
/**
 * Creates a logger setup builder
 * @param {LoggerSetup} initSetup - initial logger setup
 * @param {Map<string, LogProperty>} props - logger properties
 * @param {LogLevel} level - logging level
 * @returns new builder instance
 */
function getSetupBuilder(initSetup, props, level) {
    const builder = {
        withLevel: (level) => {
            return getSetupBuilder(Object.assign({}, initSetup), props, level);
        },
        withReporters: (...reporters) => {
            const array = mergeArrays(getArray(initSetup.reporters), reporters);
            return getSetupBuilder(setOnSetup(initSetup, "reporters", array), props, level);
        },
        withExtensions: (...extensions) => {
            const array = mergeArrays(getArray(initSetup.extensions), extensions);
            return getSetupBuilder(setOnSetup(initSetup, "extensions", array), props, level);
        },
        clearReporters: () => {
            return getSetupBuilder(setOnSetup(initSetup, "reporters", []), props, level);
        },
        clearExtensions: () => {
            return getSetupBuilder(setOnSetup(initSetup, "extensions", []), props, level);
        },
        save: () => {
            return getLogger(initSetup, props, level);
        },
    };
    return builder;
}
/**
 * Creates new logger instance
 * @param {LoggerSetup} setup
 * @param {Map<string, LogProperty>} init
 * @param {LogLevel} level
 * @returns New instance of logger
 */
function getLogger(setup, init, level) {
    function updateMap(prop, value) {
        const map = new Map(init);
        map.set(prop, value);
        return map;
    }
    const instance = {
        id: (id) => {
            return instance.prop(PROPERTIES.ID, id);
        },
        module: (moduleName) => {
            return instance.prop(PROPERTIES.MODULE, moduleName);
        },
        method: (method) => {
            return instance.prop(PROPERTIES.METHOD, method);
        },
        prop: (prop, value) => {
            return getLogger(Object.assign({}, setup), updateMap(prop, value), level);
        },
        configure: (newSetup) => {
            const copy = Object.assign(Object.assign({}, setup), newSetup);
            return getSetupBuilder(copy, new Map(init), level);
        },
        debug: (message) => __awaiter(this, void 0, void 0, function* () {
            return instance.log("debug", message);
        }),
        warn: (message) => __awaiter(this, void 0, void 0, function* () {
            return instance.log("warn", message);
        }),
        info: (message) => __awaiter(this, void 0, void 0, function* () {
            return instance.log("info", message);
        }),
        error: (message) => __awaiter(this, void 0, void 0, function* () {
            return instance.log("error", message);
        }),
        exception: (error) => __awaiter(this, void 0, void 0, function* () {
            return instance.log("exception", () => {
                return typeof error === "string"
                    ? error
                    : `[${error.name}] ${error.message}`;
            }, error);
        }),
        measure: (callback, options) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const [time, result] = yield executeMeasure(callback);
                const fixedTime = time.toFixed((_a = options === null || options === void 0 ? void 0 : options.fraction) !== null && _a !== void 0 ? _a : 4);
                init.set(PROPERTIES.PERFORFMANCE, fixedTime);
                const logResult = yield instance.log("debug", `${(_b = options === null || options === void 0 ? void 0 : options.label) !== null && _b !== void 0 ? _b : "Performance"}: ${fixedTime}`);
                if (logResult)
                    return result;
            }
            catch (e) {
                yield instance.exception(e);
                if ((options === null || options === void 0 ? void 0 : options.rethrow) === true)
                    throw e;
            }
            return null;
        }),
        log: (logLevel, message, error) => __awaiter(this, void 0, void 0, function* () {
            if (!levels.includes(logLevel) || !matchesLevel(logLevel, level)) {
                return false;
            }
            const map = new Map(init);
            if (message)
                map.set(PROPERTIES.MESSAGE, message);
            extendMap(map, setup.extensions);
            return pushLog(logLevel, map, setup.reporters, error);
        }),
    };
    return instance;
}
const levels = [
    "none",
    "exception",
    "error",
    "warn",
    "info",
    "debug",
];
const globalSetup = {
    reporters: [],
    extensions: [],
};
const logger = getLogger(globalSetup, new Map(), "none");
/* harmony default export */ const src_logger = ((/* unused pure expression or super */ null && (logger)));

;// CONCATENATED MODULE: ./src/reporters/console.ts
var console_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Extracts values from log object
 * @param {Log} data - log object
 * @param {string[]} props - list of properties to be extracted from Log object
 * @param {string} placeholder - value to be set when prop was not found
 * @returns List of properties extracted from log object
 */
function extractValuesFromLog(data, props, placeholder) {
    return props.map((p) => {
        var _a;
        let val = placeholder;
        switch (p) {
            case "date":
                val = data.timestamp.toLocaleString();
                break;
            case "level":
                val = data.level;
            default:
                if (data.props.has(p)) {
                    val = (_a = parseLogProperty(data.props.get(p))) !== null && _a !== void 0 ? _a : placeholder;
                }
                break;
        }
        return val;
    });
}
/**
 * Merges log properties into one string
 * @param {string[]} props - data props
 * @param {string} leftSeparator - left side character
 * @param {string} rightSeprator - right side character
 * @returns props merged into string
 */
function mergeProps(props, leftSeparator, rightSeprator) {
    return `${leftSeparator}${props.join(rightSeprator + leftSeparator)}${rightSeprator}`;
}
/**
 * Creates log message text
 * @param {Log} log - logger object
 * @param {ConsoleLoggerConfig} setup - reporter setup
 * @returns Log message
 */
function buildMessage(log, setup) {
    const values = extractValuesFromLog(log, setup.props, setup.placeholder);
    return mergeProps(values, setup.separator[0], setup.separator[1]);
}
/**
 * Implementaion of console log reporter
 * @param {ConsoleLoggerInit} init - initial setup object
 * @returns reporter callback
 */
function ConsoleLoggerReporter(init) {
    var _a, _b;
    const _setup = Object.assign(Object.assign({}, init), { separator: (_a = init.separator) !== null && _a !== void 0 ? _a : ["[", "]"], placeholder: (_b = init.placeholder) !== null && _b !== void 0 ? _b : "-" });
    return (log) => console_awaiter(this, void 0, void 0, function* () {
        const message = buildMessage(log, _setup);
        switch (log.level) {
            case "error":
                console.error(message);
                break;
            case "warn":
                console.warn(message);
                break;
            default:
                console.log(message);
        }
        if (log.error && _setup.printStack === true) {
            console.error(log.error);
        }
        return true;
    });
}

;// CONCATENATED MODULE: ./src/index.ts



/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=logger.js.map