export class ConsoleLoggerPlugin {
    log(level, data) {
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
    buildMessage(data) {
        var _a, _b, _c, _d;
        return `[${data.date.toLocaleString()}][${(_a = data.module) !== null && _a !== void 0 ? _a : "-"}][${(_b = data.id) !== null && _b !== void 0 ? _b : "-"}][${(_c = data.function) !== null && _c !== void 0 ? _c : "-"}][${(_d = data.message) !== null && _d !== void 0 ? _d : "-"}]`;
    }
}
