export default ConnectPoint;
declare class ConnectPoint extends Component<any, any, any> {
    static defaultProps: {
        component: typeof ConnectPointDefaultLayout;
    };
    constructor(props: any);
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
    id: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    render(): JSX.Element;
}
import { Component } from "react";
import ConnectPointDefaultLayout from "../molecules/ConnectPointDefaultLayout";
