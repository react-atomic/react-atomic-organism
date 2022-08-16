import { SelectField, SelectUI } from "organism-react-navigation";

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
    ...restProps
  } = props;
  return (
    <SelectField
      {...restProps}
      selectComponent={SelectUI}
      inputProps={{ onChange, onFocus, onBlur, onKeyUp }}
      active={results && results.length}
      onSelect={(item) => (e) => onItemClick(e, item)}
      options={results || options}
    />
  );
};

export default SelectFilterUI;
