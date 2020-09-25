import { BpdLogLevel, IBpdLoggerPlugin, LogDetails } from "../logger";

export class ConsoleLoggerPlugin implements IBpdLoggerPlugin {
    log(level: BpdLogLevel, data: LogDetails) {
        switch (level) {
            case "ERROR":
            case "EXCEPTION":
                console.error(this.buildMessage(data));
                if (data.error) {
                    console.error(data.error);
                }
                break;
            case "WARNING":
                console.warn(this.buildMessage(data));
                break;
            default:
                console.log(this.buildMessage(data));
        }
    }

    private buildMessage(data: LogDetails) {
        return `[${data.date.toLocaleString()}][${data.module ?? "-"}][${data.id ?? "-"}][${data.function ?? "-"}][${data.message ?? "-"}]`;
    }
}