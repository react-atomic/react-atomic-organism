export default BaseString;
/**
 * @extends {React.PureComponent<Props>}
 * @return {React.ReactElement} - React component
 */
declare class BaseString {
    state: {};
    resetProps(thisProps: any, thisState: any): any;
    getEl(): any;
    update(props: any, prevProps: any): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    componentDidMount(): void;
}
