export default HoverDimmerCardView;
declare class HoverDimmerCardView extends PureComponent<any, any, any> {
    constructor(props: any);
    state: {
        show: boolean;
    };
    handleHover: () => void;
    handleLeave: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { PureComponent } from "react";
