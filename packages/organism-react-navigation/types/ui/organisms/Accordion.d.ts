export default Accordion;
declare class Accordion extends PureComponent<any, any, any> {
    static defaultProps: {
        iconOpen: import("react/jsx-runtime").JSX.Element;
        iconClose: import("react/jsx-runtime").JSX.Element;
        iconLocRight: boolean;
        iconLocLeft: boolean;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        isActives: {};
    };
    handleClick(name: any): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { PureComponent } from "react";
