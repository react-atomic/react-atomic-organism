export default OnEnterInput;
declare class OnEnterInput extends PureComponent<any, any, any> {
    static defaultProps: {
        atom: string;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    handleEnter: (e: any) => void;
    render(): JSX.Element;
}
import { PureComponent } from "react";
