import ConsoleLoggerReporter from "../src/reporters/console";

/**
 * @jest-environment jsdom
 */
describe("Tests validating Console Logger Reporter", () => {
	it("Base test ", async () => {
		const reporter = ConsoleLoggerReporter({
			placeholder: "-",
			props: ["level", "message", "date"],
		});

		const result = await reporter({
			level: "debug",
			timestamp: new Date(),
			props: new Map([["message", "Test"]]),
		});

		expect(result).toBe(true);
	});

	it("Missing props are replaced by a placeholder ", async () => {
		const reporter = ConsoleLoggerReporter({
			placeholder: "-",
			props: ["id", "level", "message", "date"],
		});

		const result = await reporter({
			level: "debug",
			timestamp: new Date(),
			props: new Map([["message", "Test"]]),
		});

		expect(result).toBe(true);
	});

	it("Prints stack trace when option is turned on", async () => {
		const reporter = ConsoleLoggerReporter({
			placeholder: "-",
			props: ["id", "level", "message", "date"],
			printStack: true,
		});

		const result = await reporter({
			level: "exception",
			timestamp: new Date(),
			props: new Map([["message", "Test"]]),
			error: new Error("Test"),
		});

		expect(result).toBe(true);
	});
});
