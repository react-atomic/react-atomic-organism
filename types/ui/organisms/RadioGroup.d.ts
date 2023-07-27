export default RadioGroup;
declare class RadioGroup extends PureComponent<any, any, any> {
    static propTypes: {
        options: any;
        name: any;
    };
    static defaultProps: {
        labelLocator: (d: any) => any;
        valueLocator: (d: any) => any;
        checkedCallback: any;
        I18NValueMissing: string;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        options: any;
        value: any;
        prePropsValue: any;
    };
    constructor(props: any);
    state: {
        value: any;
        error: string;
    };
    isChecked(item: any, nextValue: any, current: any): any;
    altValue(item: any): any;
    checkValidity({ setState }: {
        setState: any;
    }): boolean;
    getChecked(): undefined;
    getValue(): any;
    handleClick: (e: any, before: any, after: any, ref: any) => boolean;
    handleError(e: any): any;
    handleDisplayError(el: any, error: any): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { PureComponent } from "react";
