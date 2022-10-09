export default Replace;
declare class Replace extends PureComponent<any, any, any> {
    static defaultProps: {
        interval: number;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        childs: any[];
        prevChildren: any;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        no: number;
        childs: {};
    };
    handleNext: () => void;
    _time: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
import { PureComponent } from "react";
