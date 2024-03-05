//@ts-check

import { Children } from "react";
import build from "reshow-build";
import Cell from "../organisms/Cell";
import get from "get-object-value";

const SimpleBody = ({
  trComponent = Cell,
  rowCount = 0,
  children = null,
  tbodyComponent = "tbody",
  tdComponent = "td",
}) => {
  /**
   * @param {string|number} rowIndex
   */
  const renderTD = (rowIndex) => {
    const arr = [];
    Children.forEach(children, (child, key) => {
      const cell = get(child, ["props", "cell"]);
      if (cell) {
        const jsx = build(cell, {
          altWrap: Cell,
          doCallFunction: true,
        })({
          "data-atom": "td",
          "data-cell-component": tdComponent,
          "data-col-index": key,
          "data-row-index": rowIndex,
          key,
        });
        arr.push(jsx);
      }
    });
    return arr;
  };

  const renderTR = () => {
    const arr = [];
    for (let i = 0, len = rowCount; i < len; i++) {
      const jsx = build(trComponent, {
        doCallFunction: true,
      })(
        {
          "data-atom": "tr",
          "data-cell-component": "tr",
          "data-row-index": i,
          key: i,
        },
        renderTD(i)
      );
      arr.push(jsx);
    }
    if (arr.length) {
      return build(tbodyComponent)({}, arr);
    } else {
      return null;
    }
  };

  return renderTR();
};

export default SimpleBody;
