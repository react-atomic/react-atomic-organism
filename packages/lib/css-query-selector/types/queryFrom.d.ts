export default queryFrom;
declare function queryFrom(base: any): false | {
    all: (sel: any) => any;
    ancestor: (el: any, ancestor: any) => any;
    el: (el: any) => any;
    one: (sel: any) => any;
};
export const defaultQuery: false | {
    all: (sel: any) => any;
    ancestor: (el: any, ancestor: any) => any;
    el: (el: any) => any;
    one: (sel: any) => any;
};
