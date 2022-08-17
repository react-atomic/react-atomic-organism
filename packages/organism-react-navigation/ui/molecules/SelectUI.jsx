import DropdownUI from "../molecules/DropdownUI";
import { build, mixClass, Menu, Item, SemanticUI } from "react-atomic-molecule";

const SelectMenu = (props) => <Menu {...props} />;

const SelectUI = (props) => {
  const {
    dropdownComponent = DropdownUI,
    menuComponent = SelectMenu,
    labelLocator = (d) => d.label,
    valueLocator = (d) => d.value,
    itemLocator = (d) => d,
    itemsLocator = (d) => d,
    onSelect = () => {},
    alwaysOpen,
    active,
    hideTitle,
    search,
    defaultValue,
    value,
    placeholder,
    options,
    name,
    onBeforeChange,
    onChange,
    wrapRefCb,
    refCb,
    inputProps,
    ...restProps
  } = props;
  let thisPlaceholder = null;
  if (placeholder) {
    thisPlaceholder = (
      <SemanticUI style={Styles.dropdownPlaceholder}>{placeholder}</SemanticUI>
    );
  }
  let thisSelected = value;
  let thisList = null;
  if (options) {
    thisList = build(SelectMenu)(
      null,
      itemsLocator(options).map((l, key) => {
        l = itemLocator(l);
        const optionValue = valueLocator(l);
        const optionText = labelLocator(l);
        let active = null;
        if (value === optionValue) {
          thisSelected = optionText;
          active = true;
        }
        return (
          <Item
            onClick={onSelect(l)}
            data-v={optionValue}
            key={key}
            className={mixClass({
              active,
              selected: restProps["data-selected-index"] === key,
            })}
          >
            {optionText}
          </Item>
        );
      })
    );
  }

  let inputAttr;
  if (search) {
    inputAttr = {
      className: "search",
      placeholder: "Type or search a command",
      style: { border: "none" },
      type: "search",
    };
  } else {
    inputAttr = {
      type: "hidden",
    };
  }

  const placeholderHd = (
    <SemanticUI
      key="input"
      atom="input"
      refCb={refCb}
      name={name}
      value={value || ""}
      {...{ ...inputAttr, ...inputProps }}
    />
  );

  return build(dropdownComponent)(
    {
      ...restProps,
      refCb: wrapRefCb,
      list: thisList,
      placeholderHd,
      className: mixClass(props.className, "selection", {
        search,
        active: alwaysOpen || active,
      }),
    },
    hideTitle ? null : thisSelected || thisPlaceholder
  );
};

export default SelectUI;

const Styles = {
  dropdownPlaceholder: {
    color: "#ccc",
  },
};
