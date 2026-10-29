import React from "react";
import BaseLayout from "../molecules/BaseLayout";
declare class BoxGroupDefaultLayout extends BaseLayout {
    el: any;
    state: {
        rectW: number;
        rectH: number;
        boxsPos: {};
    };
    childrenEl: {};
    getEl(): any;
    update(prevState: any): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    render(): React.JSX.Element;
}
export default BoxGroupDefaultLayout;
