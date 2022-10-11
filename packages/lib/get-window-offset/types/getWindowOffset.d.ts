export default getWindowOffset;
declare function getWindowOffset(dom: any, debug: any): false | {
    locs: any[];
    firstKey: string;
    secondKey: string;
    domInfo: any;
    scrollInfo: import("get-scroll-info").InfoType;
};
