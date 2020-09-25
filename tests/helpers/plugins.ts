import { BpdLogLevel, IBpdLoggerPlugin, LogDetails } from '../../src/logger';

export class SamplePlugin implements IBpdLoggerPlugin {
    level: BpdLogLevel;
    data: LogDetails;
    constructor() {
        this.level = this.data = undefined;
    }

    log(level: BpdLogLevel, data: LogDetails): void {
        this.level = level;
        this.data = data;
    }

}