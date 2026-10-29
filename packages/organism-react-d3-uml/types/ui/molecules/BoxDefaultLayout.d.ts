import React from "react";
import BaseLayout from "../molecules/BaseLayout";
declare class BoxDefaultLayout extends BaseLayout {
    el: any;
    getEl(): any;
    handleEl: (el: any) => void;
    render(): React.JSX.Element;
}
export default BoxDefaultLayout;
