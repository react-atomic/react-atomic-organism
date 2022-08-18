import { isValidElement } from "react";

import {
  build,
  useCSS,
  useLazyInject,
  mixClass,
  SemanticUI,
  Icon,
} from "react-atomic-molecule";

const DropdownUI = (props) => {
  injects = useLazyInject(InjectStyles, injects);
  useCSS(["dropdown"], "semantic");

  const {
    /*useDropdown*/
    handler = {},

    /* Styles */
    boxSizing = "border-box",
    propsListStyle,
    stateListStyle,

    /* Status */
    hideList,

    /* Component */
    list,

    icon = true,
    children,
    style,
    titleStyle,
    iconStyle,
    textClassName,
    compHd,
    compBd,
    compFt,
    className,
    refCb,
    ...otherProps
  } = props;
  const textClasses = mixClass("text", textClassName);
  const thisText = (
    <SemanticUI
      className={textClasses}
      style={{ ...Styles.label, ...titleStyle }}
    >
      {children}
    </SemanticUI>
  );
  let thisIcon = null;
  if (icon) {
    if (!isValidElement(icon)) {
      thisIcon = (
        <Icon
          className="dropdown-default-icon dropdown icon"
          style={iconStyle}
        ></Icon>
      );
    } else {
      thisIcon = icon;
    }
  }
  let thisList = null;
  if (!hideList && list) {
    thisList = build(list)({
      style: {
        ...Styles.list,
        ...propsListStyle,
        ...stateListStyle,
      },
      refCb: handler.listEl,
      onClick: handler.listClick,
      onTouchStart: handler.touchStart,
    });
  }
  const thisClass = mixClass("dropdown", className);
  return (
    <SemanticUI
      {...otherProps}
      style={{ ...Styles.container, ...style, boxSizing }}
      className={thisClass}
      refCb={handler.thisEl || refCb}
      onClick={handler.dropdownClick}
    >
      {compHd}
      {thisText}
      {thisIcon}
      {compBd}
      {thisList}
      {compFt}
    </SemanticUI>
  );
};

export default DropdownUI;

const Styles = {
  container: {
    border: "none",
    boxShadow: "none",
    minHeight: "auto",
  },
  label: {
    display: "inline-block",
  },
  list: {
    boxSizing: "inherit",
    maxHeight: "50vh",
    overflow: "auto",
  },
};

let injects;
const InjectStyles = {
  resetSelectionBorderColor: [
    {
      borderColor: "inherit",
    },
    [
      ".selection.active.dropdown .menu.ui",
      ".ui.selection.active.dropdown:hover .menu.ui",
    ].join(","),
  ],
  defaultIcon: [
    {
      transform: ["rotate(180deg)"],
    },
    [
      ".ui.simple.dropdown:hover .dropdown-default-icon",
      ".ui.dropdown.active .dropdown-default-icon",
    ].join(","),
  ],
  initMenu: [
    {
      display: "none !important",
    },
    ".ui.simple.dropdown .menu",
  ],
  activeMenu: [
    {
      display: "block !important",
    },
    [".ui.dropdown.active>.menu", ".ui.simple.dropdown:hover>.menu"].join(","),
  ],
  /*https://github.com/fomantic/Fomantic-UI/pull/1209/files*/
  fixMinHeight: [
    {
      boxSizing: "inherit",
    },
    ".ui.dropdown .menu>.item",
  ],
  /*upward*/
  upward: [
    {
      top: "auto",
    },
    [
      ".ui.simple.upward.dropdown .menu",
      ".ui.simple.upward.active.dropdown>.menu",
      ".ui.simple.upward.dropdown:hover>.menu",
    ].join(","),
  ],
};
