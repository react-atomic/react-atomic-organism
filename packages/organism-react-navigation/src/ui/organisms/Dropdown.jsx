//@ts-check

import * as React from "react";

import DropdownUI from "../molecules/DropdownUI";
import { useDropdown } from "../../hooks/useDropdown";

/**
 * @param {any} props
 * @returns {React.ReactElement}
 */
const Dropdown = (props) => {
  const { restProps, ...nextProps } = useDropdown(props);
  return <DropdownUI {...{ ...restProps, ...nextProps }} />;
};

export default Dropdown;
