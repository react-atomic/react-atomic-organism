export default UMLGraph;
declare class UMLGraph extends Component<any, any, any> {
    static defaultProps: {
        boxGroupsLocator: (d: any) => any;
        boxGroupXLocator: () => void;
        boxGroupYLocator: () => void;
        boxsLocator: (d: any) => any;
        uniqueBoxGroupNameLocator: (d: any) => any;
        boxNameLocator: (d: any) => {
            name: any;
        };
        connsLocator: (d: any) => any;
        connFromBoxGroupLocator: (d: any) => any;
        connToBoxGroupLocator: (d: any) => any;
        connFromBoxLocator: (d: any) => any;
        connToBoxLocator: (d: any) => any;
        arrowHeadComponent: import("react").MemoExoticComponent<({ multi, id, viewBox, d, refX, refY, markerUnits, markerWidth, markerHeight, orient, fill, }: {
            multi?: {
                "": {};
            };
            id?: string;
            viewBox?: string;
            d?: string;
            refX?: number;
            refY?: number;
            markerUnits?: string;
            markerWidth?: number;
            markerHeight?: number;
            orient?: string;
            fill?: string;
        }) => JSX.Element>;
        autoArrange: boolean;
        editToCenter: boolean;
        editToCenterDelay: number;
        disableDagreWorker: boolean;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    boxGroupNameInvertMap: {};
    boxGroupMap: {};
    boxQueue: {};
    startPoint: any;
    endPoint: any;
    lazyMove: {};
    oConn: any;
    mount: boolean;
    addLazyMoveWithMouseEvent(boxGroupName: any, e: any, dnd: any): {
        x: number;
        y: number;
    };
    addLazyMove(boxGroupName: any, x: any, y: any): void;
    add(payload: any): void;
    addBoxGroup: (obj: any) => void;
    addBoxQueue(obj: any): void;
    addBox(obj: any): boolean;
    getLazyMoveByName(boxGroupName: any): any;
    getLines(): any;
    getBox(id: any, groupId: any): any;
    getBoxGroup(id: any): any;
    getBoxGroupByName(name: any): any;
    getBoxGroupIdByName(name: any): any;
    getBoxComponent(name: any, groupName: any): any;
    getBoxGroupComponent(name: any): any;
    getVectorEl(): any;
    getBoundingClientRect(): import("getoffset").Offset;
    getConnectStartPoint(): any;
    getConnectEndPoint(): any;
    getTransform: () => any;
    getZoomK: () => any;
    setConnectStartPoint(el: any): any;
    setConnectEndPoint(el: any): void;
    center(boxGroup: any, cb: any): void;
    edit: (name: any, payload: any) => void;
    del: (name: any) => void;
    insideHtml: (el: any) => any;
    insideVector: (el: any) => any;
    isOnGraph: (el: any) => boolean;
    applyXY: (pX: any, pY: any, dom: any) => {
        x: number;
        y: number;
    };
    arrange(): void;
    syncPropConnects(): void;
    handleD3Load: () => number;
    handleBoxGroupDragEnd: (e: any) => void;
    handleZoom: (e: any) => void;
    handleLineEdit: (payload: any) => void;
    handleLineDel: (payload: any) => void;
    handleConnAdd: (payload: any) => void;
    handleConnWillAdd: (payload: any) => boolean;
    handleLoad: () => void;
    isInit: boolean;
    handleSetLineListRef: (el: any) => void;
    lineList: any;
    handleZoomRef: (o: any) => void;
    zoom: any;
    handleSetZoomEl: (el: any) => void;
    zoomEl: any;
    handleGetZoomEl: () => any;
    handleSetVector: (el: any) => void;
    vector: any;
    handleSetHtmlEl: (el: any) => void;
    html: any;
    handleSetHtmlObj: (o: any) => void;
    htmlObj: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
import { Component } from "react";
