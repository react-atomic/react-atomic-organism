export default Checkbox;
declare class Checkbox {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        prePropsChecked: any;
        checked: any;
        id: any;
    };
    constructor(props: any);
    state: {};
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
    render(): any;
    el: any;
}
declare namespace Checkbox {
    namespace defaultProps {
        let atom: string;
        let type: string;
        let checked: boolean;
        let disabled: boolean;
    }
}
