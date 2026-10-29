import * as React from "react";
declare const PureComponent: typeof React.PureComponent;
/**
 * @extends {React.PureComponent}
 */
declare class Accordion extends PureComponent {
    props: any;
    state: {
        isActives: {};
    };
    static defaultProps: {
        iconOpen: React.JSX.Element;
        iconClose: React.JSX.Element;
        iconLocRight: boolean;
        iconLocLeft: boolean;
    };
    constructor(/**@type any*/ props: any);
    /**
     * @param {string} name
     */
    handleClick: (name: string) => void;
    render(): React.JSX.Element;
}
export default Accordion;
