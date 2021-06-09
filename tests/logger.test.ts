/**
 * @jest-environment jsdom
 */

import logger, {
	Log,
	LoggerExtension,
	LoggerReporter,
	LogLevel,
	parseLogProperty,
	PROPERTIES,
} from "../src/logger";

function MockReporter(onLog: (log: Log) => void): LoggerReporter {
	let results: Log[] = [];
	return async (logObject: Log) => {
		results.push(logObject);
		onLog(logObject);
		return true;
	};
}

function MockExtension(): LoggerExtension {
	return () => {
		return ["mock", "mockup"];
	};
}

test("Base logger setup - set reporter", async () => {
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("debug")
		.save();

	await mLog.error("Test");

	expect(result).toBeDefined();
	expect(result.props.get(PROPERTIES.MESSAGE)).toBe("Test");
	expect(result.level).toBe("error");
});

test("Base logger setup - set reporter and extension", async () => {
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
			extensions: [MockExtension()],
		})
		.withLevel("debug")
		.save();

	await mLog.error("Test");

	expect(result).toBeDefined();
	expect(result.props.get("mock")).toBe("mockup");
	expect(result.level).toBe("error");
});

test("Base logger setup - set reporter and level", async () => {
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("none")
		.save();

	await mLog.error("Test");

	expect(result).toBeUndefined();
});

/**
 * Setup builder
 */

test("[Builder] Base logger setup - set reporter", async () => {
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure()
		.withReporters(reporter)
		.withLevel("debug")
		.save();

	await mLog.error("Test");

	expect(result).toBeDefined();
	expect(result.props.get(PROPERTIES.MESSAGE)).toBe("Test");
	expect(result.level).toBe("error");
});

test("[Builder] Base logger setup - set reporter and extension", async () => {
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure()
		.withReporters(reporter)
		.withExtensions(MockExtension())
		.withLevel("debug")
		.save();

	await mLog.error("Test");

	expect(result).toBeDefined();
	expect(result.props.get("mock")).toBe("mockup");
	expect(result.level).toBe("error");
});

test("[Builder] Base logger setup - set reporter and level", async () => {
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure()
		.withReporters(reporter)
		.withLevel("none")
		.save();

	await mLog.error("Test");

	expect(result).toBeUndefined();
});

/**
 * Levels
 * Check if logger respects system log level vs logged message level
 */

const levels: LogLevel[] = ["error", "warn", "info", "debug"];
const len = levels.length;

for (let sysIdx = 0; sysIdx < len; sysIdx++) {
	const sysName = levels[sysIdx];
	for (let localIdx = 0; localIdx < len; localIdx++) {
		const localName = levels[localIdx];
		test(`Respect log level current vs system - [${localName}] -> [${sysName}]`, async () => {
			let result: Log | undefined = undefined;
			const reporter = MockReporter((log: Log) => {
				result = log;
			});
			const expectedResult = localIdx <= sysIdx;
			const log = logger
				.configure()
				.withReporters(reporter)
				.withLevel(sysName)
				.save();

			await log.log(localName, "Test");

			if (expectedResult) {
				expect(result).toBeDefined();
			} else {
				expect(result).toBeUndefined();
			}
		});
	}
}

/**
 * Properties
 */

test("[Properties] set id", async () => {
	const id = "test-id";
	const message = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("debug")
		.save()
		.id(id);

	await mLog.debug(message);

	expect(result).toBeDefined();
	expect(result.props.get(PROPERTIES.ID)).toBe(id);
	expect(result.props.get(PROPERTIES.MESSAGE)).toBe(message);
	expect(result.level).toBe("debug");
});

test("[Properties] set module", async () => {
	const id = "test-id";
	const moduleName = "module-name";
	const message = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("debug")
		.save()
		.id(id)
		.module(moduleName);

	await mLog.debug(message);

	expect(result).toBeDefined();
	expect(result.props.get("id")).toBe(id);
	expect(result.props.get(PROPERTIES.MESSAGE)).toBe(message);
	expect(result.props.get(PROPERTIES.MODULE)).toBe(moduleName);
	expect(result.level).toBe("debug");
});

test("[Properties] set method", async () => {
	const id = "test-id";
	const moduleName = "module-name";
	const methodName = "method-name";
	const message = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("debug")
		.save()
		.id(id)
		.module(moduleName)
		.method(methodName);

	await mLog.debug(message);

	expect(result).toBeDefined();
	expect(result.props.get(PROPERTIES.ID)).toBe(id);
	expect(result.props.get(PROPERTIES.MESSAGE)).toBe(message);
	expect(result.props.get(PROPERTIES.MODULE)).toBe(moduleName);
	expect(result.props.get(PROPERTIES.METHOD)).toBe(methodName);
	expect(result.level).toBe("debug");
});

test("[Properties] custom property", async () => {
	const propName = "custom";
	const propValue = "custom-value";
	const message = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("debug")
		.save()
		.prop(propName, propValue);

	await mLog.debug(message);

	expect(result).toBeDefined();
	expect(result.props.get(PROPERTIES.MESSAGE)).toBe(message);
	expect(result.props.get(propName)).toBe(propValue);
	expect(result.level).toBe("debug");
});

/**
 * Check property passed as function
 */

test("Property passed as callback", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("debug")
		.save();

	await mLog.error(() => {
		return expected;
	});

	expect(parseLogProperty(result.props.get(PROPERTIES.MESSAGE))).toBe(
		expected
	);
	expect(result.level).toBe("error");
});

/**
 * Test loggers
 */

test("Message log: debug - the same or higher", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("debug")
		.save();

	await mLog.debug(expected);

	expect(result.props.get(PROPERTIES.MESSAGE)).toBe(expected);
	expect(result.level).toBe("debug");
});

test("Message log: debug - lower", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("info")
		.save();

	await mLog.debug(expected);

	expect(result).toBeUndefined();
});

test("Message log: info - the same or higher", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("info")
		.save();

	await mLog.info(expected);

	expect(result.props.get(PROPERTIES.MESSAGE)).toBe(expected);
	expect(result.level).toBe("info");
});

test("Message log: info - lower", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("warn")
		.save();

	await mLog.info(expected);

	expect(result).toBeUndefined();
});

test("Message log: warn - the same or higher", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("warn")
		.save();

	await mLog.warn(expected);

	expect(result.props.get(PROPERTIES.MESSAGE)).toBe(expected);
	expect(result.level).toBe("warn");
});

test("Message log: warn - lower", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("error")
		.save();

	await mLog.warn(expected);

	expect(result).toBeUndefined();
});

test("Message log: error - the same or higher", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("error")
		.save();

	await mLog.error(expected);

	expect(result.props.get(PROPERTIES.MESSAGE)).toBe(expected);
	expect(result.level).toBe("error");
});

test("Message log: error - lower", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("exception")
		.save();

	await mLog.error(expected);

	expect(result).toBeUndefined();
});

test("Message log: exception - the same or higher", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("exception")
		.save();

	await mLog.exception(new Error(expected));

	expect(parseLogProperty(result.props.get(PROPERTIES.MESSAGE))).toContain(
		expected
	);
	expect(result.level).toBe("exception");
});

test("Message log: exception - lower", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("none")
		.save();

	await mLog.exception(new Error(expected));

	expect(result).toBeUndefined();
});

/**
 * Error
 */

test("Error is pushed to reporter - method exception", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("exception")
		.save();

	await mLog.exception(new Error(expected));

	expect(result).toBeDefined();
	expect(result.error).toBeDefined();
	expect(result.level).toBe("exception");
});

test("Error is pushed to reporter - method log", async () => {
	const expected = "test";
	let result: Log | undefined = undefined;
	const reporter = MockReporter((log: Log) => {
		result = log;
	});
	const mLog = logger
		.configure({
			reporters: [reporter],
		})
		.withLevel("exception")
		.save();

	await mLog.log("exception", "xxx", new Error(expected));

	expect(result).toBeDefined();
	expect(result.error).toBeDefined();
	expect(result.level).toBe("exception");
});

/** Measure */

describe("Tests checking function [measure]", () => {
	it("Measures function execution", async () => {
		const expected = "test";
		function getExpected() {
			return expected;
		}

		let logResult: Log | undefined = undefined;
		const reporter = MockReporter((log: Log) => {
			logResult = log;
		});
		const mLog = logger
			.configure({
				reporters: [reporter],
			})
			.withLevel("debug")
			.save();

		const result = await mLog.measure(getExpected);

		expect(result).toBe(expected);
		expect(logResult.props.has(PROPERTIES.PERFORFMANCE)).toBe(true);
		expect(logResult.props.has(PROPERTIES.MESSAGE)).toBe(true);
		expect(logResult.level).toBe("debug");
	});

	it("Measures function execution - exception", async () => {
		function getExpected() {
			throw new Error("Error");
		}

		let logResult: Log | undefined = undefined;
		const reporter = MockReporter((log: Log) => {
			logResult = log;
		});
		const mLog = logger
			.configure({
				reporters: [reporter],
			})
			.withLevel("debug")
			.save();

		const result = await mLog.measure(getExpected);

		expect(result).toBe(null);
		expect(logResult.props.has(PROPERTIES.PERFORFMANCE)).toBe(false);
		expect(logResult.props.has(PROPERTIES.MESSAGE)).toBe(true);
		expect(logResult.error).toBeDefined();
		expect(logResult.level).toBe("exception");
	});

	it("Measures promise execution", async () => {
		const expected = "test";
		function getExpected() {
			return new Promise((resolve) => {
				resolve(expected);
			});
		}

		let logResult: Log | undefined = undefined;
		const reporter = MockReporter((log: Log) => {
			logResult = log;
		});
		const mLog = logger
			.configure({
				reporters: [reporter],
			})
			.withLevel("debug")
			.save();

		const result = await mLog.measure(getExpected());

		expect(result).toBe(expected);
		expect(logResult.props.has(PROPERTIES.PERFORFMANCE)).toBe(true);
		expect(logResult.props.has(PROPERTIES.MESSAGE)).toBe(true);
		expect(logResult.level).toBe("debug");
	});

	it("Measures promise execution - exception", async () => {
		function getExpected() {
			return new Promise((resolve, reject) => {
				reject("error");
			});
		}

		let logResult: Log | undefined = undefined;
		const reporter = MockReporter((log: Log) => {
			logResult = log;
		});
		const mLog = logger
			.configure({
				reporters: [reporter],
			})
			.withLevel("debug")
			.save();

		const result = await mLog.measure(getExpected());

		expect(result).toBe(null);
		expect(logResult.props.has(PROPERTIES.PERFORFMANCE)).toBe(false);
		expect(logResult.props.has(PROPERTIES.MESSAGE)).toBe(true);
		expect(logResult.error).toBeDefined();
		expect(logResult.level).toBe("exception");
	});

	it("Measures promise execution - rethrow", async () => {
		function getExpected() {
			return new Promise((resolve, reject) => {
				reject("error");
			});
		}

		let logResult: Log | undefined = undefined;
		const reporter = MockReporter((log: Log) => {
			logResult = log;
		});
		const mLog = logger
			.configure({
				reporters: [reporter],
			})
			.withLevel("debug")
			.save();

		let result = null;
		let wasError = false;
		try {
			result = await mLog.measure(getExpected(), {
				rethrow: true,
			});
		} catch (e) {
			wasError = true;
		}

		expect(result).toBe(null);
		expect(logResult.props.has(PROPERTIES.PERFORFMANCE)).toBe(false);
		expect(logResult.props.has(PROPERTIES.MESSAGE)).toBe(true);
		expect(logResult.error).toBeDefined();
		expect(wasError).toBeTruthy();
	});
});
