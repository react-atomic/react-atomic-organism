import React, { PureComponent } from "react";
declare class Checkbox extends PureComponent {
    el: any;
    state: {};
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        prePropsChecked: any;
        checked: any;
        id: any;
    };
    getValue(): any;
    getName(): any;
    getInput(): any;
    getChecked(): {
        input: any;
        state: any;
    };
    handleClick: (e: any) => void;
    processChange(checked: any): void;
    handleChange: (e: any) => void;
    render(): React.JSX.Element;
}
declare namespace Checkbox {
    var defaultProps: {
        atom: string;
        type: string;
        checked: boolean;
        disabled: boolean;
    };
}
export default Checkbox;
