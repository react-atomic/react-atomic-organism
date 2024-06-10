export default BaseString;
/**
 * @extends {React.PureComponent<Props>}
 * @return {React.ReactElement} - React component
 */
declare class BaseString extends PureComponent<Props, any, any> {
    constructor(props: Props);
    constructor(props: Props, context: any);
    state: {};
    resetProps(thisProps: any, thisState: any): any;
    getEl(): any;
    update(props: any, prevProps: any): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    componentDidMount(): void;
}
import { PureComponent } from "react";
