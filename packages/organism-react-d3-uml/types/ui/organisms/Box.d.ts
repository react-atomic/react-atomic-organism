export default Box;
declare class Box extends Component<any, any, any> {
    constructor(props: any);
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
    elRef: any;
    id: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}
import { Component } from "react";
