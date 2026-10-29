declare class ConnectController {
    lineTimer: any;
    connects: {};
    queue: any;
    updateCbQueue: any[];
    host: any;
    lineObjs: {};
    constructor(props: any);
    getLine(id: any): any;
    getLineObj(id: any): any;
    getIsHover(id: any): any;
    setLineObj(id: any, o: any): void;
    setLineStart(id: any, start: any): void;
    setLineEnd(id: any, end: any): void;
    addLine(props: any): string;
    updateLine(id: any, params: any): void;
    deleteLine(id: any): void;
    getConnectIds(from: any, to: any): {
        fromBoxId?: undefined;
        toBoxId?: undefined;
        mergeId?: undefined;
        invertMergeId?: undefined;
    } | {
        fromBoxId: any;
        toBoxId: any;
        mergeId: string;
        invertMergeId: string;
    };
    getConnectNames(from: any, to: any): {
        fromBoxId?: undefined;
        toBoxId?: undefined;
        mergeId?: undefined;
        invertMergeId?: undefined;
        fromBoxName: any;
        toBoxName: any;
        fromBoxGroupName: any;
        toBoxGroupName: any;
        fromBoxGroupId: any;
        toBoxGroupId: any;
    } | {
        fromBoxId: any;
        toBoxId: any;
        mergeId: string;
        invertMergeId: string;
        fromBoxName: any;
        toBoxName: any;
        fromBoxGroupName: any;
        toBoxGroupName: any;
        fromBoxGroupId: any;
        toBoxGroupId: any;
    };
    getConnects(): any[];
    addConnected(lineId: any, from: any, to: any, init: any): any;
    clearTimeout(): void;
    setState(callback: any, updateCb: any, delay: any): void;
    getUniqueFromTo(): {};
}
export default ConnectController;
