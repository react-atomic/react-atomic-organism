declare class minMaxHelper {
    max: any;
    min: any;
    process: (/**@type {Function}*/ locater?: Function) => (/**@type any*/ data: any) => this;
    toArray: () => any[];
}
export default minMaxHelper;
