export default FormattedJSON;
declare class FormattedJSON extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): import("react/jsx-runtime").JSX.Element;
    formatJSON(input: any, space: any): string;
}
declare namespace FormattedJSON {
    namespace defaultProps {
        let atom: string;
    }
}
import { Component } from "react";
