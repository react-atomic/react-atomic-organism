export default ConstraintForm;
export class ConstraintField extends PureComponent<any, any, any> {
    static defaultProps: {
        component: typeof Field;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        "data-message-type": any;
        "data-message": any;
    };
    checkValidity(el: any): any;
    handleDisplayError(el: any, message: any, nativeMessage: any): void;
    handleCompRef: (el: any) => void;
    compRef: any;
    handleEl: (el: any) => void;
    el: any;
    getConstraintId(): string;
    constraintId: string;
    componentWillUnmount(): void;
    render(): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}
declare class ConstraintForm extends PureComponent<any, any, any> {
    static defaultProps: {
        component: typeof Form;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        error: boolean;
    };
    checkValidity(): {
        hasError: boolean;
        errorEl: any;
        results: {};
    };
    submit(): void;
    getEl(): any;
    getSerialize(): any;
    handleRefCb: (el: any) => void;
    form: any;
    handleSubmit: (e: any) => void;
    render(): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}
import { PureComponent } from "react";
import { Field } from "react-atomic-molecule";
import { Form } from "react-atomic-molecule";
