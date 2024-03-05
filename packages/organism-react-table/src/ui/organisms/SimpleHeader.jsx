//@ts-check

import { Children } from "react";
import build from "reshow-build";
import Cell from "../organisms/Cell";
import get from "get-object-value";

const SimpleHeader = ({
  theadTrComponent = null,
  children = null,
  theadComponent = "thead",
  trComponent = "tr",
  thComponent = "th",
}) => {
  const arr = [];
  let emptyHeaderCount = 0;

  Children.forEach(children, (child, key) => {
    if (!child) {
      return;
    }
    const { header = "th", ...myProps } = {
      "data-atom": "th",
      key,
      ...get(child, ["props"], {}),
    };
    if (!header) {
      emptyHeaderCount++;
    }
    myProps["data-cell-component"] = thComponent;
    delete myProps.cell;
    arr.push(
      build(header, {
        altWrap: build(Cell)({ "data-cell-component": thComponent }),
        doCallFunction: true,
      })(myProps)
    );
  });

  if (emptyHeaderCount === arr.length) {
    return null;
  } else {
    return build(theadComponent)(
      {},
      build(theadTrComponent || trComponent)({}, arr)
    );
  }
};

export default SimpleHeader;
