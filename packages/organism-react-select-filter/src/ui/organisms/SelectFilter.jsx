import { forwardRef } from "react";
import { Suggestion } from "react-atomic-organism";
import { defaultLocator } from "organism-react-navigation";
import { Fzf } from "fzf";
import Highlight from "organism-react-tag-highlight";

import SelectFilterUI from "../molecules/SelectFilterUI";
import defaultUseScrollToSelect from "../../useScrollToSelect";

const defaultItemFilter = (arr, currentValue, selector) => {
  if (null == currentValue || !arr) {
    return arr;
  } else {
    const fzf = new Fzf(arr, { selector });
    const entries = fzf.find(currentValue);
    return entries.map((entry) => {
      entry.item._rank = entry;
      return entry.item;
    });
  }
};

const defaultHighlighter = (text, value, l) => {
  if (text === value && l._rank) {
    const { start, end } = l._rank;
    if (-1 !== start && -1 !== end) {
      return (
        <Highlight start={start} end={end}>
          {value}
        </Highlight>
      );
    }
  }
  return text;
};

const SelectFilterPropTypes = {};

/**
 * @type React.FC<SelectFilterPropTypes>
 */
const SelectFilter = forwardRef((props, ref) => {
  const {
    useScrollToSelect = defaultUseScrollToSelect,
    itemFilter = defaultItemFilter,
    valueLocator = defaultLocator.value,
    couldCreate = false,
    options,
    ...restProps
  } = props;
  const select = (
    <SelectFilterUI
      hideTitle
      search
      useScrollToSelect={useScrollToSelect}
      highlighter={defaultHighlighter}
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
});

SelectFilter.displayName = "SelectFilter";

export default SelectFilter;
