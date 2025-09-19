export default Accordion;
/**
 * @extends {React.PureComponent}
 */
declare class Accordion {
    static defaultProps: {
        iconOpen: any;
        iconClose: any;
        iconLocRight: boolean;
        iconLocLeft: boolean;
    };
    constructor(props: any);
    props: any;
    state: {
        isActives: {};
    };
    setState: any;
    /**
     * @param {string} name
     */
    handleClick: (name: string) => void;
    render(): any;
}
