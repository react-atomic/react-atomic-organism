export default Accordion;
declare class Accordion extends React.PureComponent<any, any, any> {
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
    /**
     * @param {string} name
     */
    handleClick(name: string): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
import * as React from "react";
