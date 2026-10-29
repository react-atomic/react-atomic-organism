declare const Cell: ({ "data-cell-component": cellComponent, "data-row-index": rowIndex, "data-col-index": columnIndex, columnKey, ...restProps }: {
    [x: string]: any;
    columnKey?: any;
    "data-cell-component"?: string;
    "data-col-index"?: any;
    "data-row-index"?: any;
}) => import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
export default Cell;
