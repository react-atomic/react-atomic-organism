import React, { Component } from "react";
declare class BoxGroup extends Component {
    lastX: any;
    lastY: any;
    el: any;
    id: number;
    _mount: boolean;
    state: {
        absX: number;
        absY: number;
    };
    boxNameInvertMap: {};
    boxs: {};
    move: (x: any, y: any) => void;
    handleDrag: ({ absX, absY }: {
        absX: any;
        absY: any;
    }) => void;
    handleDragEnd: (e: any) => void;
    handleEdit: (e: any) => void;
    handleDel: (e: any) => void;
    handleSetRef: (el: any) => void;
    handleGetEl: () => any;
    addBox(obj: any): void;
    getXY(): {
        x: number;
        y: number;
    };
    getBoxIdByName(name: any): any;
    getBox(id: any): any;
    getWH(): {
        width: number;
        height: number;
    };
    getName(): any;
    getId(): number;
    getEl(): any;
    setBoxNameInvertMap(id: any, name: any): void;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
}
export default BoxGroup;
