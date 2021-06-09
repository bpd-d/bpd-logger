var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseLogProperty } from "../logger";
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
export default function ConsoleLoggerReporter(init) {
    var _a, _b;
    const _setup = Object.assign(Object.assign({}, init), { separator: (_a = init.separator) !== null && _a !== void 0 ? _a : ["[", "]"], placeholder: (_b = init.placeholder) !== null && _b !== void 0 ? _b : "-" });
    return (log) => __awaiter(this, void 0, void 0, function* () {
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
