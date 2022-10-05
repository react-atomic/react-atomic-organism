export default Select;
declare class Select extends PureComponent<any, any, any> {
    static defaultProps: {
        labelLocator: (d: any) => any;
        valueLocator: (d: any) => any;
        simple: boolean;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        value: any;
        prevValue: any;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        value: any;
    };
    handleSelect: (item: any) => (e?: {}) => void;
    render(): JSX.Element;
}
import { PureComponent } from "react";
