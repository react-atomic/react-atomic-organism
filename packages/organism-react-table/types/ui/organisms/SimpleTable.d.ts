export default SimpleTable;
declare function SimpleTable({ tableComponent, wrapperComponent, className, style, wrap, ...restProps }: {
    [x: string]: any;
    tableComponent?: string;
    wrapperComponent?: string;
    className: any;
    style: any;
    wrap: any;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
import * as React from "react";
