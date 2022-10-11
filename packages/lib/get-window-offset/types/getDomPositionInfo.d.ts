export default getDomPositionInfo;
declare function getDomPositionInfo(dom: any): {
    domInfo: import("getoffset").Offset;
    fixedNode: any;
    scrollNode: any;
};
