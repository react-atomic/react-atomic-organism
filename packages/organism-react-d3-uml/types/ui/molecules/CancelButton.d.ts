export default CancelButton;
declare class CancelButton extends PureComponent<any, any, any> {
    static defaultProps: {
        show: boolean;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        r: number;
    };
    handleEl: (el: any) => any;
    el: any;
    componentDidMount(): void;
    render(): JSX.Element;
}
import { PureComponent } from "react";
