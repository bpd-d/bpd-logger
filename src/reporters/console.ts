import { Log, LoggerReporter, parseLogProperty } from "../logger";

export interface ConsoleLoggerInit {
	props: string[];
	separator?: [string, string];
	placeholder?: string;
	printStack?: boolean;
}

interface ConsoleLoggerConfig {
	props: string[];
	separator: [string, string];
	placeholder: string;
	printStack?: boolean;
}

/**
 * Extracts values from log object
 * @param {Log} data - log object
 * @param {string[]} props - list of properties to be extracted from Log object
 * @param {string} placeholder - value to be set when prop was not found
 * @returns List of properties extracted from log object
 */
function extractValuesFromLog(
	data: Log,
	props: string[],
	placeholder: string
): string[] {
	return props.map((p) => {
		let val = placeholder;
		switch (p) {
			case "date":
				val = data.timestamp.toLocaleString();
				break;
			case "level":
				val = data.level;
			default:
				if (data.props.has(p)) {
					val = parseLogProperty(data.props.get(p)) ?? placeholder;
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
function mergeProps(
	props: string[],
	leftSeparator: string,
	rightSeprator: string
): string {
	return `${leftSeparator}${props.join(
		rightSeprator + leftSeparator
	)}${rightSeprator}`;
}

/**
 * Creates log message text
 * @param {Log} log - logger object
 * @param {ConsoleLoggerConfig} setup - reporter setup
 * @returns Log message
 */
function buildMessage(log: Log, setup: ConsoleLoggerConfig): string {
	const values = extractValuesFromLog(log, setup.props, setup.placeholder);
	return mergeProps(values, setup.separator[0], setup.separator[1]);
}

/**
 * Implementaion of console log reporter
 * @param {ConsoleLoggerInit} init - initial setup object
 * @returns reporter callback
 */
export default function ConsoleLoggerReporter(
	init: ConsoleLoggerInit
): LoggerReporter {
	const _setup: ConsoleLoggerConfig = {
		...init,
		separator: init.separator ?? ["[", "]"],
		placeholder: init.placeholder ?? "-",
	};

	return async (log: Log) => {
		const message = buildMessage(log, _setup);
		switch (log.level) {
			case "error":
			case "exception":
				console.error(message);
				break;
			case "warn":
				console.warn(message);
				break;
			case "info":
				console.info(message);
				break;
			case "debug":
				console.debug(message);
				break;
			default:
				console.log(message);
		}
		if (log.error && _setup.printStack === true) {
			console.error(log.error);
		}
		return true;
	};
}
