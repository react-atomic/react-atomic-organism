import React, { Component } from "react";
declare class Box extends Component {
    elRef: any;
    id: number;
    isConnectPointDrag: boolean;
    points: {};
    hoverTimer: boolean;
    state: {
        showConnectPoint: boolean;
    };
    getFromBoxId(): any;
    getBoxGroup(): any;
    getBoxGroupId(): any;
    getName(): any;
    getId(): number;
    getRef(): any;
    getEl(): any;
    getEdge(): any;
    getRecentPoint(center: any): any;
    getConnectPoint(center: any, endCenter: any): any;
    getFromPoint(): any;
    getToPoint(): any;
    getPoint(key: any): any;
    addPoint: (obj: any) => void;
    clearHoverTimer(): void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handlePointDrag: (bool: any) => void;
    handleEl: (el: any) => void;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}
export default Box;
