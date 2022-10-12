export default BoxGroupDefaultLayout;
declare class BoxGroupDefaultLayout extends BaseLayout {
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
    render(): JSX.Element;
    el: any;
}
import BaseLayout from "../molecules/BaseLayout";
