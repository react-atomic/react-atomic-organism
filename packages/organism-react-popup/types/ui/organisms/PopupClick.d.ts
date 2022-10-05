export default PopupClick;
declare class PopupClick extends Component<any, any, any> {
    static defaultProps: {
        once: boolean;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    handleClick: () => void;
    open(): void;
    close(): void;
    componentDidMount(): void;
    render(): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}
import { Component } from "react";
