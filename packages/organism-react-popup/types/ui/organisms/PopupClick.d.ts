import React, { Component } from "react";
declare class PopupClick extends Component {
    static defaultProps: {
        once: boolean;
    };
    handleClick: () => void;
    open(): void;
    close(): void;
    componentDidMount(): void;
    render(): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}
export default PopupClick;
