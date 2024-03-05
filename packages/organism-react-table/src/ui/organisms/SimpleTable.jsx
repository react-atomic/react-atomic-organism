//@ts-check
import SimpleHeader from "./SimpleHeader";
import SimpleBody from "./SimpleBody";
import build from "reshow-build";
import * as React from "react";

const SimpleTable = ({
  tableComponent = "table",
  wrapperComponent = "div",
  className,
  style,
  wrap,
  ...restProps
}) => {
  const tableElement = build(tableComponent)(
    {
      "data-atmo": "table",
      className,
      style,
    },
    <>
      <SimpleHeader {...restProps} />
      <SimpleBody {...restProps} />
    </>
  );
  if (wrap) {
    return build(wrapperComponent)(
      {
        className: "table-wrap",
        style: Styles.wrap,
      },
      tableElement
    );
  } else {
    return tableElement;
  }
};

export default SimpleTable;

const Styles = {
  wrap: {
    maxWidth: "100%",
    overflowX: "auto",
  },
};
