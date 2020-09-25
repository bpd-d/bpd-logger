import { BpdLogLevel, IBpdLoggerPlugin, LogDetails } from "../logger";
export declare class ConsoleLoggerPlugin implements IBpdLoggerPlugin {
    log(level: BpdLogLevel, data: LogDetails): void;
    private buildMessage;
}
