import React from "react";
import BaseLayout from "../molecules/BaseLayout";
declare class LineDefaultLayout extends BaseLayout {
    el: any;
    lineEl: any;
    static defaultProps: {
        markerEnd: string;
        curve: boolean;
    };
    getEl(): any;
    getLinePoint(len: any, maxPercent: any): any;
    handleEl: (el: any) => void;
    handleLineEl: (el: any) => void;
    render(): React.JSX.Element;
}
export default LineDefaultLayout;
