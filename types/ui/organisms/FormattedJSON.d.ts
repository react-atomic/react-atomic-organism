import React, { Component } from "react";
declare class FormattedJSON extends Component {
    render(): React.JSX.Element;
    formatJSON(input: any, space: any): string;
}
declare namespace FormattedJSON {
    var defaultProps: {
        atom: string;
    };
}
export default FormattedJSON;
