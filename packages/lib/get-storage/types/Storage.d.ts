export default Storage;
declare class Storage {
    constructor(_storage: any, _disableEncode: any);
    _storage: any;
    _de: any;
    set(k: any, v: any): Storage;
    merge(arr: any): this;
    get(k: any): any;
}
export function parseField(s: any): any[];
export function encode(s: any): string;
export function decode(s: any): any;
