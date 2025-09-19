export default Replace;
declare class Replace {
    static defaultProps: {
        interval: number;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        childs: any[];
        prevChildren: any;
    };
    state: {
        no: number;
        childs: {};
    };
    handleNext: () => void;
    _time: NodeJS.Timeout;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
}
