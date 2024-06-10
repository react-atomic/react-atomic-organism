export default minMaxHelper;
declare class minMaxHelper {
    max: any;
    min: any;
    process: (locater?: Function) => (data: any) => this;
    toArray: () => any[];
}
