export default Accordion;
declare class Accordion extends PureComponent<any, any, any> {
    static defaultProps: {
        iconOpen: JSX.Element;
        iconClose: JSX.Element;
        iconLocRight: boolean;
        iconLocLeft: boolean;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        isActives: {};
    };
    handleClick(name: any): void;
    render(): JSX.Element;
}
import { PureComponent } from "react";
