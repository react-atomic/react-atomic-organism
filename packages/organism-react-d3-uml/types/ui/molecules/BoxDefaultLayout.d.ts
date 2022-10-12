export default BoxDefaultLayout;
declare class BoxDefaultLayout extends BaseLayout {
    getEl(): any;
    handleEl: (el: any) => void;
    el: any;
    render(): JSX.Element;
}
import BaseLayout from "../molecules/BaseLayout";
