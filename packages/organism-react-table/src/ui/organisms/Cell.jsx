//@ts-check

import build from "reshow-build";

const Cell = ({
  "data-cell-component": cellComponent = "div",
  "data-row-index": rowIndex,
  "data-col-index": columnIndex,
  columnKey,
  ...restProps
}) =>
  build(cellComponent)({
    ...restProps,
    "data-row": rowIndex,
    "data-col": columnIndex ?? columnKey,
  });

export default Cell;
