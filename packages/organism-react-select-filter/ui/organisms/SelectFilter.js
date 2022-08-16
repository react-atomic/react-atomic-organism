import { forwardRef } from "react";
import { Suggestion } from "react-atomic-organism";

import SelectFilterUI from "../molecules/SelectFilterUI";

const defaultItemFilter = (d, value) =>
  d && -1 !== (d + "").toLowerCase().indexOf((value + "").toLowerCase());

const defaultValueLocator = (d) => d.value;

const SelectFilter = forwardRef((props, ref) => {
  const {
    valueLocator = defaultValueLocator,
    couldCreate = false,
    options,
  } = props;

  const select = (
    <SelectFilterUI
      hideTitle
      search
      options={options}
      onChange={(value, e) => {}}
    />
  );
  return (
    <Suggestion
      ref={ref}
      filter
      couldCreate={couldCreate}
      component={select}
      results={options}
      valueLocator={valueLocator}
      itemFilter={defaultItemFilter}
    />
  );
});

SelectFilter.displayName = "SelectFilter";

export default SelectFilter;
