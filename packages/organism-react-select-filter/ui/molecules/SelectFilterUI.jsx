import { SelectField, SelectUI } from "organism-react-navigation";
import { useCallback } from "react";
import callfunc from "call-func";
import { build } from "react-atomic-molecule";

const SelectFilterUI = ({
  options,
  results,
  onWrapClick,
  onItemClick,
  onChange,
  onFocus,
  onBlur,
  onKeyUp,
  inputProps,
  notFoundComponent,
  ...restProps
}) => {
  const handleSelect = useCallback(
    (item) => (e) => {
      e.item = item;
      return callfunc(onItemClick, [e]);
    },
    [onItemClick]
  );

  const active = results && results.length;

  let placeholderFt;
  if (!active && notFoundComponent) {
    placeholderFt = build(notFoundComponent)();
  }

  return (
    <SelectField
      {...restProps}
      selectComponent={SelectUI}
      inputProps={{ ...inputProps, onChange, onFocus, onBlur, onKeyUp }}
      active={active}
      onSelect={handleSelect}
      options={results || options}
      placeholderFt={placeholderFt}
    />
  );
};

export default SelectFilterUI;
