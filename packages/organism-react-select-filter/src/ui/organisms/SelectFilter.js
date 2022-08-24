import { forwardRef } from "react";
import { Suggestion } from "react-atomic-organism";
import { defaultLocator } from "organism-react-navigation";
import { Fzf } from "fzf";

import SelectFilterUI from "../molecules/SelectFilterUI";
import defaultUseScrollToSelect from "../../useScrollToSelect";

const defaultItemFilter = (arr, currentValue, selector) => {
  if (null == currentValue || !arr) {
    return arr;
  } else {
    const fzf = new Fzf(arr, { selector });
    const entries = fzf.find(currentValue);
    return entries.map((entry) => entry.item);
  }
};

const SelectFilter = forwardRef(
  (
    {
      useScrollToSelect = defaultUseScrollToSelect,
      itemFilter = defaultItemFilter,
      valueLocator = defaultLocator.value,
      couldCreate = false,
      options,
      ...restProps
    },
    ref
  ) => {
    const select = (
      <SelectFilterUI
        hideTitle
        search
        useScrollToSelect={useScrollToSelect}
        options={options}
        fieldClassName="select-filter"
      />
    );
    return (
      <Suggestion
        {...restProps}
        ref={ref}
        filter
        couldCreate={couldCreate}
        component={select}
        results={options}
        valueLocator={valueLocator}
        itemFilter={itemFilter}
      />
    );
  }
);

SelectFilter.displayName = "SelectFilter";

export default SelectFilter;
