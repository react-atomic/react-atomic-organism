import { forwardRef } from "react";
import { Suggestion } from "react-atomic-organism";
import { defaultLocator } from "organism-react-navigation";

import SelectFilterUI from "../molecules/SelectFilterUI";

const defaultItemFilter = (d, value) =>
  d && -1 !== (d + "").toLowerCase().indexOf((value + "").toLowerCase());

const SelectFilter = forwardRef(
  (
    {
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
