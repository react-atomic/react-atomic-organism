import {
  build,
  mixClass,
  mergeRef,
  Divider,
  Menu,
  Item,
  Icon,
  Header,
  SemanticUI,
} from "react-atomic-molecule";
import callfunc from "call-func";

import DropdownUI from "../molecules/DropdownUI";
import defaultLocator from "../../src/defaultLocator";

const SelectMenu = (props) => <Menu {...props} />;
const SelectItem = ({ icon, children, header, divider, ...props }) => {
  let thisIcon;
  if (icon) {
    thisIcon = <Icon>{icon}</Icon>;
  }
  const comp = [
    <Item key="item" {...props}>
      {thisIcon}
      {children}
    </Item>,
  ];
  if (divider) {
    comp.unshift(<Divider key="divider" ui={false} />);
  }
  if (header) {
    comp.unshift(
      <Header key={header} ui={false}>
        {header}
      </Header>
    );
  }
  return comp;
};

const SelectUI = (props) => {
  const {
    dropdownComponent = DropdownUI,
    menuComponent = SelectMenu,
    itemComponent = SelectItem,
    labelLocator = defaultLocator.label,
    valueLocator = defaultLocator.value,
    iconLocator = defaultLocator.icon,
    headerLocator = defaultLocator.header,
    dividerLocator = defaultLocator.divider,
    itemLocator = defaultLocator.item,
    itemsLocator = defaultLocator.items,
    onSelect = () => {},
    useScrollToSelect = [],
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
  const [lastRoot] = callfunc(useScrollToSelect, [props]);
  if (options) {
    let prevHeader;
    thisList = build(menuComponent)(
      null,
      itemsLocator(options).map((l, itemIndex) => {
        l = itemLocator(l);
        const optionValue = valueLocator(l);
        const optionText = labelLocator(l);
        const itemIcon = iconLocator(l);
        const header = headerLocator(l);
        const divider = dividerLocator(l);
        let active = null;
        if (value === optionValue) {
          thisSelected = optionText;
          active = true;
        }
        let thisHeader = null;
        if (header !== prevHeader) {
          prevHeader = header;
          thisHeader = header;
        }
        const selected = restProps["data-selected-index"] === itemIndex;
        return build(itemComponent)(
          {
            key: optionValue,
            onClick: onSelect(l),
            "data-v": optionValue,
            "data-item-inex": itemIndex,
            className: mixClass({
              active,
              selected,
            }),
            icon: itemIcon,
            header: thisHeader,
            divider,
          },
          optionText
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

  const compHd = (
    <SemanticUI
      key="input"
      atom="input"
      refCb={refCb}
      name={name}
      value={value || ""}
      {...{ ...inputAttr, ...inputProps }}
    />
  );

  const handleWrapRefCb = (el) => mergeRef(el, [wrapRefCb, lastRoot]);

  return build(dropdownComponent)(
    {
      ...restProps,
      refCb: handleWrapRefCb,
      list: thisList,
      compHd,
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
