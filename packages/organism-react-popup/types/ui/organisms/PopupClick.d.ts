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
}
import { Component } from "react";
