import { SelectField, SelectUI } from "organism-react-navigation";
import { useCallback } from "react";
import callfunc from "call-func";

const SelectFilterUI = (props) => {
  const {
    options,
    results,
    onWrapClick,
    onItemClick,
    onChange,
    onFocus,
    onBlur,
    onKeyUp,
    inputProps,
    ...restProps
  } = props;

  const handleItemClick = useCallback(
    (e, item) => {
      e.item = item;
      return callfunc(onItemClick, [e]);
    },
    [onItemClick]
  );

  const handleSelect = (item) => (e) => handleItemClick(e, item);

  return (
    <SelectField
      {...restProps}
      selectComponent={SelectUI}
      inputProps={{ ...inputProps, onChange, onFocus, onBlur, onKeyUp }}
      active={results && results.length}
      onSelect={handleSelect}
      options={results || options}
    />
  );
};

export default SelectFilterUI;
