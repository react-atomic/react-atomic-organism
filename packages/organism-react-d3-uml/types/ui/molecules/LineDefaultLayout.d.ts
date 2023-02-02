export default LineDefaultLayout;
declare class LineDefaultLayout extends BaseLayout {
    static defaultProps: {
        markerEnd: string;
        curve: boolean;
    };
    getEl(): any;
    getLinePoint(len: any, maxPercent: any): any;
    handleEl: (el: any) => void;
    el: any;
    handleLineEl: (el: any) => void;
    lineEl: any;
    render(): JSX.Element;
}
import BaseLayout from "../molecules/BaseLayout";
