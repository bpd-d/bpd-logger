import { matchesLevel } from "../src/logger";

test("shall match debug -> debug", () => {
	const result = matchesLevel("debug", "debug");
	expect(result).toBeTruthy();
});

test("shall match info -> debug", () => {
	const result = matchesLevel("info", "debug");
	expect(result).toBeTruthy();
});

test("shall match warn -> debug", () => {
	const result = matchesLevel("warn", "debug");
	expect(result).toBeTruthy();
});

test("shall match error -> debug", () => {
	const result = matchesLevel("error", "debug");
	expect(result).toBeTruthy();
});

test("shall match debug -> info", () => {
	const result = matchesLevel("debug", "info");
	expect(result).toBeFalsy();
});

test("shall match info -> info", () => {
	const result = matchesLevel("info", "info");
	expect(result).toBeTruthy();
});

test("shall match warn -> info", () => {
	const result = matchesLevel("warn", "info");
	expect(result).toBeTruthy();
});

test("shall match error -> info", () => {
	const result = matchesLevel("error", "info");
	expect(result).toBeTruthy();
});

test("shall match debug -> warn", () => {
	const result = matchesLevel("debug", "warn");
	expect(result).toBeFalsy();
});

test("shall match info -> warn", () => {
	const result = matchesLevel("info", "warn");
	expect(result).toBeFalsy();
});

test("shall match warn -> warn", () => {
	const result = matchesLevel("warn", "warn");
	expect(result).toBeTruthy();
});

test("shall match error -> warn", () => {
	const result = matchesLevel("error", "warn");
	expect(result).toBeTruthy();
});

test("shall match debug -> error", () => {
	const result = matchesLevel("debug", "error");
	expect(result).toBeFalsy();
});

test("shall match info -> error", () => {
	const result = matchesLevel("info", "error");
	expect(result).toBeFalsy();
});

test("shall match warn -> error", () => {
	const result = matchesLevel("warn", "error");
	expect(result).toBeFalsy();
});

test("shall match error -> error", () => {
	const result = matchesLevel("error", "error");
	expect(result).toBeTruthy();
});

test("shall match debug -> none", () => {
	const result = matchesLevel("debug", "none");
	expect(result).toBeFalsy();
});

test("shall match info -> none", () => {
	const result = matchesLevel("info", "none");
	expect(result).toBeFalsy();
});

test("shall match warn -> none", () => {
	const result = matchesLevel("warn", "none");
	expect(result).toBeFalsy();
});

test("shall match error -> none", () => {
	const result = matchesLevel("error", "none");
	expect(result).toBeFalsy();
});
