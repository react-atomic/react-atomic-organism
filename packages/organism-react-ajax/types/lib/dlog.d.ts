export default dlog;
declare function dlog(opts: any): dlog;
declare class dlog {
    constructor(opts: any);
    setName(name: any): any;
    name: any;
    setLevel(level: any): any;
    level: any;
    level_no: any;
    setSize(size: any): any;
    size: any;
    level_map: {
        trace: number;
        debug: number;
        info: number;
        warn: number;
        error: number;
        silent: number;
    };
    color_map: {
        name: string;
        trace: string;
        debug: string;
        info: string;
        warn: string;
        error: string;
    };
    getCSS(level: any): string;
    log(level: any, data: any): void;
    show(level: any, data: any): void;
    trace(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
