import React, { Component } from "react";
import ConnectPointDefaultLayout from "../molecules/ConnectPointDefaultLayout";
declare class ConnectPoint extends Component {
    id: number;
    static defaultProps: {
        component: typeof ConnectPointDefaultLayout;
    };
    state: {
        start: any;
        absX: number;
        absY: number;
    };
    start: boolean;
    dnd: any;
    lines: {};
    getEl: () => any;
    handleDragStart: (e: any) => void;
    handleDrag: (e: any) => void;
    handleDragEnd: (e: any) => void;
    handleEl: (el: any) => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    setLine(id: any, type: any): void;
    delLine(id: any): void;
    getVectorCenter(el: any, host: any): any;
    getHtmlCenter(el: any, host: any): any;
    getCenter(): any;
    getBox(): any;
    getBoxName(): any;
    getBoxGroupName(): any;
    getId(): number;
    isShow(): any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    render(): React.JSX.Element;
}
export default ConnectPoint;
