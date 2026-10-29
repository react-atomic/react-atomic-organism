import React, { PureComponent } from "react";
declare class HoverDimmerCardView extends PureComponent {
    state: {
        show: boolean;
    };
    constructor(props: any);
    handleHover: () => void;
    handleLeave: () => void;
    render(): React.JSX.Element;
}
export default HoverDimmerCardView;
