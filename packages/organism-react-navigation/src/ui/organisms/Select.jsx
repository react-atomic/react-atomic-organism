// @ts-check

import * as React from "react";
const { forwardRef, useImperativeHandle } = React;

import SelectUI from "../molecules/SelectUI";
import Dropdown from "../organisms/Dropdown";
import { useSelect } from "../../hooks/useSelect";

/**
 * @typedef {import("../../hooks/useSelect").SelectProps} SelectProps
 */

/**
 * @type React.FC<SelectProps>
 * @returns {React.ReactElement}
 */
const Select = forwardRef((props, ref) => {
  const { handler, expose, labelLocator, valueLocator } = useSelect(props);
  useImperativeHandle(ref, () => expose, []);
  return (
    <SelectUI
      {...props}
      labelLocator={labelLocator}
      valueLocator={valueLocator}
      dropdownComponent={Dropdown}
      value={expose.getValue()}
      onSelect={handler.select}
    />
  );
});

Select.displayName = "Select";

export default Select;
