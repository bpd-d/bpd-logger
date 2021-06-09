import { LoggerReporter } from "../logger";
export interface ConsoleLoggerInit {
    props: string[];
    separator?: [string, string];
    placeholder?: string;
    printStack?: boolean;
}
/**
 * Implementaion of console log reporter
 * @param {ConsoleLoggerInit} init - initial setup object
 * @returns reporter callback
 */
export default function ConsoleLoggerReporter(init: ConsoleLoggerInit): LoggerReporter;
