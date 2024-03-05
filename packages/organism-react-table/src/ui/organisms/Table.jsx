//@ts-check
import get from "get-object-value";
import * as React from "react";

import SimpleTable from "../organisms/SimpleTable";

/**
 * @param {any} props
 */
const Table = (props) => {
  let rows = get(props, ["rows"], []);
  if (props.rowsLocator) {
    rows = props.rowsLocator(rows);
  }
  return <SimpleTable rowCount={get(rows, ["length"])} {...props} />;
};

export default Table;
