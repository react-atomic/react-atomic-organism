export default BoxGroup;
declare class BoxGroup extends Component<any, any, any> {
    constructor(props: any);
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
    lastX: any;
    lastY: any;
    handleEdit: (e: any) => void;
    handleDel: (e: any) => void;
    handleSetRef: (el: any) => void;
    el: any;
    handleGetEl: () => any;
    addBox(obj: any): void;
    getXY(): {
        x: number;
        y: number;
    };
    getBoxIdByName(name: any): any;
    getBox(id: any): any;
    getWH(): {
        width: any;
        height: any;
    };
    getName(): any;
    getId(): number;
    getEl(): any;
    setBoxNameInvertMap(id: any, name: any): void;
    id: number;
    componentDidMount(): void;
    _mount: boolean;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
import { Component } from "react";
