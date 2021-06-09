export type LogProperty = string | (() => string) | undefined;
export type MeasureCallbackType<T> = (() => T) | Promise<T>;

export interface Log {
	props: Map<string, LogProperty>;
	timestamp: Date;
	level: LogLevel;
	error?: Error | string;
}

export const PROPERTIES = {
	MESSAGE: "message",
	ID: "id",
	MODULE: "module",
	METHOD: "method",
	PERFORFMANCE: "performance",
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

export type LogLevel =
	| "debug"
	| "info"
	| "warn"
	| "error"
	| "exception"
	| "none";

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
	measure: <T>(
		callback: MeasureCallbackType<T>,
		options?: LoggerMeasureOptions
	) => Promise<T | null>;
	/**
	 * Logs message on specific level
	 * @param {LogLevel} logLevel level that messsage shall be logged on
	 * @param {string} message
	 * @param {Error} error (optional) in case of an exception
	 * @returns
	 */
	log: (
		level: LogLevel,
		message?: LogProperty,
		error?: Error | string
	) => Promise<boolean>;
}

/**
 * Checks whether coming message log level matches level set in library
 * @param {LogLevel} level - current log level
 * @param {LogLevel} systemLevel - log level set in library
 * @returns whether current log level matches system level
 */
export function matchesLevel(level: LogLevel, systemLevel: LogLevel): boolean {
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
function extendMap(
	map: Map<string, LogProperty>,
	extensions?: LoggerExtension[]
) {
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
async function pushLog(
	level: LogLevel,
	props: Map<string, LogProperty>,
	reporters?: LoggerReporter[],
	error?: Error | string
): Promise<boolean> {
	if (!reporters) {
		return false;
	}

	try {
		const timestamp = new Date();
		await Promise.all(
			reporters.map((p) =>
				p({
					props,
					timestamp,
					level,
					error,
				})
			)
		);
	} catch (e) {
		console.error(e);
		return false;
	}
	return true;
}

/**
 * Merges two array into one
 * @param {T[]} arr1 - first array
 * @param {T[]} arr2 - second array
 * @returns new array
 */
function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
	return [...arr1, ...arr2];
}

/**
 *
 * @param array - {optional}
 * @returns array or empty array when it doesnt exist
 */
function getArray<T>(array?: T[]): T[] {
	return array ? array : [];
}

async function executeCallback<T>(callback: () => T): Promise<[number, T]> {
	const start = performance.now();
	const result = callback();
	return [performance.now() - start, result];
}

async function executePromise<T>(callback: Promise<T>): Promise<[number, T]> {
	const start = performance.now();
	const result = await callback;
	return [performance.now() - start, result];
}

async function executeMeasure<T>(
	callback: MeasureCallbackType<T>
): Promise<[number, T]> {
	if (typeof callback === "function") {
		return executeCallback(callback);
	}
	if (callback instanceof Promise) {
		return executePromise(callback);
	}

	return [0, callback];
}

/**
 * Creates copy of setup object with new property set
 * @param {LoggerSetup} setup - setup object
 * @param {string} id - setup property key
 * @param {any} value - value to be set on the object
 * @returns new setup object
 */
function setOnSetup(
	setup: LoggerSetup,
	id: keyof LoggerSetup,
	value: any
): LoggerSetup {
	return {
		...setup,
		[id]: value,
	};
}

/**
 * Parses log property into string
 * @param {LogProperty} prop - log property
 * @returns
 */
export function parseLogProperty(prop: LogProperty): string | undefined {
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
export function getSetupBuilder(
	initSetup: LoggerSetup,
	props: Map<string, LogProperty>,
	level: LogLevel
): ISetupBuilder {
	const builder: ISetupBuilder = {
		withLevel: (level: LogLevel) => {
			return getSetupBuilder({ ...initSetup }, props, level);
		},
		withReporters: (...reporters: LoggerReporter[]) => {
			const array = mergeArrays<LoggerReporter>(
				getArray(initSetup.reporters),
				reporters
			);
			return getSetupBuilder(
				setOnSetup(initSetup, "reporters", array),
				props,
				level
			);
		},
		withExtensions: (...extensions: LoggerExtension[]) => {
			const array = mergeArrays(
				getArray(initSetup.extensions),
				extensions
			);
			return getSetupBuilder(
				setOnSetup(initSetup, "extensions", array),
				props,
				level
			);
		},
		clearReporters: () => {
			return getSetupBuilder(
				setOnSetup(initSetup, "reporters", []),
				props,
				level
			);
		},
		clearExtensions: () => {
			return getSetupBuilder(
				setOnSetup(initSetup, "extensions", []),
				props,
				level
			);
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
export function getLogger(
	setup: LoggerSetup,
	init: Map<string, LogProperty>,
	level: LogLevel
): Logger {
	function updateMap(prop: string, value: LogProperty) {
		const map = new Map(init);
		map.set(prop, value);
		return map;
	}

	const instance: Logger = {
		id: (id: string) => {
			return instance.prop(PROPERTIES.ID, id);
		},
		module: (moduleName: string) => {
			return instance.prop(PROPERTIES.MODULE, moduleName);
		},
		method: (method: string) => {
			return instance.prop(PROPERTIES.METHOD, method);
		},
		prop: (prop: string, value: LogProperty) => {
			return getLogger({ ...setup }, updateMap(prop, value), level);
		},
		configure: (newSetup?: LoggerSetup) => {
			const copy = { ...setup, ...newSetup };
			return getSetupBuilder(copy, new Map(init), level);
		},
		debug: async (message?: LogProperty) => {
			return instance.log("debug", message);
		},
		warn: async (message?: LogProperty) => {
			return instance.log("warn", message);
		},
		info: async (message?: LogProperty) => {
			return instance.log("info", message);
		},
		error: async (message?: LogProperty) => {
			return instance.log("error", message);
		},
		exception: async (error: Error | string) => {
			return instance.log(
				"exception",
				() => {
					return typeof error === "string"
						? error
						: `[${error.name}] ${error.message}`;
				},
				error
			);
		},
		measure: async <T>(
			callback: MeasureCallbackType<T>,
			options?: LoggerMeasureOptions
		) => {
			try {
				const [time, result] = await executeMeasure(callback);
				const fixedTime = time.toFixed(options?.fraction ?? 4);
				init.set(PROPERTIES.PERFORFMANCE, fixedTime);
				const logResult = await instance.log(
					"debug",
					`${options?.label ?? "Performance"}: ${fixedTime}`
				);
				if (logResult) return result;
			} catch (e) {
				await instance.exception(e);
				if (options?.rethrow === true) throw e;
			}
			return null;
		},
		log: async (
			logLevel: LogLevel,
			message?: LogProperty,
			error?: Error | string
		) => {
			if (!levels.includes(logLevel) || !matchesLevel(logLevel, level)) {
				return false;
			}
			const map = new Map(init);
			if (message) map.set(PROPERTIES.MESSAGE, message);
			extendMap(map, setup.extensions);
			return pushLog(logLevel, map, setup.reporters, error);
		},
	};
	return instance;
}

const levels: LogLevel[] = [
	"none",
	"exception",
	"error",
	"warn",
	"info",
	"debug",
];

const globalSetup: LoggerSetup = {
	reporters: [],
	extensions: [],
};

const logger = getLogger(globalSetup, new Map(), "none");
export default logger;
