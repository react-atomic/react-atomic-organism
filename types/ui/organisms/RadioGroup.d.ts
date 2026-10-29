import React, { PureComponent } from "react";
declare class RadioGroup extends PureComponent {
    state: {
        value: any;
        error: string;
    };
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
    isChecked(item: any, nextValue: any, current: any): any;
    altValue(item: any): any;
    checkValidity({ setState }: {
        setState: any;
    }): boolean;
    getChecked(): any;
    getValue(): any;
    handleClick: (e: any, before: any, after: any, ref: any) => boolean;
    handleError(e: any): any;
    handleDisplayError(el: any, error: any): void;
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        options: any;
        value: any;
        prePropsValue: any;
    };
    render(): React.JSX.Element;
}
export default RadioGroup;
