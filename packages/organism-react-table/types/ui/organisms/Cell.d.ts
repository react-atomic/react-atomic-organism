export default Cell;
declare function Cell({ "data-cell-component": cellComponent, "data-row-index": rowIndex, "data-col-index": columnIndex, columnKey, ...restProps }: {
    [x: string]: any;
    "data-cell-component"?: string;
    "data-row-index": any;
    "data-col-index": any;
    columnKey: any;
}): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
