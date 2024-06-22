//@ts-check

import build from "reshow-build";

const Cell = ({
  "data-cell-component": cellComponent = "div",
  "data-row-index": rowIndex = null,
  "data-col-index": columnIndex = null,
  columnKey = null,
  ...restProps
}) =>
  build(cellComponent)({
    ...restProps,
    "data-row": rowIndex,
    "data-col": columnIndex ?? columnKey,
  });

export default Cell;
