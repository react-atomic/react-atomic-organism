import { PureComponent } from "react";
declare class Replace extends PureComponent {
    _time: number;
    static defaultProps: {
        interval: number;
    };
    state: {
        no: number;
        childs: {};
    };
    handleNext: () => void;
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        childs: any[];
        prevChildren: any;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): import("react").JSX.Element;
}
export default Replace;
