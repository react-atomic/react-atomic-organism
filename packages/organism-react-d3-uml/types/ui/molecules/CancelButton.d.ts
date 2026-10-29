import React, { PureComponent } from "react";
declare class CancelButton extends PureComponent {
    el: any;
    static defaultProps: {
        show: boolean;
    };
    state: {
        r: number;
    };
    handleEl: (el: any) => any;
    componentDidMount(): void;
    render(): React.JSX.Element;
}
export default CancelButton;
