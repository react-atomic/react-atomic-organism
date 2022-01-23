import React, {
  isValidElement,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import get from "get-object-value";

import {
  build,
  useCSS,
  useLazyInject,
  mixClass,
  SemanticUI,
  Icon,
  Item,
} from "react-atomic-molecule";
import { useTimer } from "reshow-hooks";
import { doc } from "win-doc";
import DropdownIcon from "ricon/Dropdown";

const useDropdown = (props) => {
  const {
    list,
    listStyle: propsListStyle,
    titleStyle,
    iconStyle,
    icon,
    children,
    style,
    className,
    textClassName,
    simple,
    ...others
  } = props;
  const [titleTimer] = useTimer();
  const [menuTimer] = useTimer();
  const handleClose = useRef();
  const thisEl = useRef();
  const listEl = useRef();
  const isActive = useRef();
  const isListClick = useRef();
  const [stateListStyle, setStateListStyle] = useState({});
  const [hideList, setHideList] = useState(false);
  injects = useLazyInject(InjectStyles, injects);
  useCSS(["dropdown"], "semantic");
  useEffect(() => {
    handleClose.current = (e) => {
      const target = e.target;
      if (thisEl.current.contains(target)) {
        return;
      }
      expose.close();
    };
    return () => {
      if (!simple) {
        doc().removeEventListener("click", handleClose.current);
      }
    };
  }, []);

  const expose = {
    open: () => {
      const runTimeListStyle = {};
      if (simple) {
        runTimeListStyle.visibility = "hidden";
        titleTimer(() => {
          runTimeListStyle.visibility = "inherit";
          setStateListStyle({ ...runTimeListStyle });
        }, 300);
      }
      doc().addEventListener("click", handleClose.current);
      runTimeListStyle.display = "block";
      isActive.current = true;
      setStateListStyle(runTimeListStyle);
    },
    close: () => {
      doc().removeEventListener("click", handleClose.current);
      isActive.current = false;
      setStateListStyle({});
    },
    isOpen: () => {
      if (simple) {
        return get(listEl.current, ["style", "display"]) !== "";
      } else {
        return isActive.current;
      }
    },
  };

  const handler = {
    thisEl: (el) => (thisEl.current = el),
    listEl: (el) => (listEl.current = el),
    dropdownClick: (e) => {
      if (!isListClick.current) {
        if (!expose.isOpen()) {
          expose.open();
        } else {
          expose.close();
        }
      } else {
        isListClick.current = false;
      }
    },
    listClick: (e) => {
      if (simple) {
        if (!expose.isOpen()) {
          setTimeout(() => {
            setHideList(true);
            menuTimer(() => setHideList(false), 500);
          });
        }
      } else {
        expose.close();
      }
      isListClick.current = true;
    },
    touchStart: (e) => {
      if (!expose.isOpen()) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  };

  return {
    handler,
    others,

    /* Styles */
    style,
    titleStyle,
    propsListStyle,
    stateListStyle,
    iconStyle,

    /* Classes */
    className,
    textClassName,

    /* Status */
    hideList,
    simple,
    isActive,

    /* Component */
    children,
    icon,
    list,
  };
};

const Dropdown = (props) => {
  const {
    handler,
    others,

    /* Styles */
    style,
    titleStyle,
    propsListStyle,
    stateListStyle,
    iconStyle,

    /* Classes */
    className,
    textClassName,

    /* Status */
    hideList,
    simple,
    isActive,

    /* Component */
    children,
    icon,
    list,
  } = useDropdown(props);

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
  const classes = mixClass(className, "dropdown", {
    active: isActive.current,
    simple,
  });
  return (
    <SemanticUI
      {...others}
      style={{ ...Styles.container, ...style }}
      className={classes}
      refCb={handler.thisEl}
      onClick={handler.dropdownClick}
    >
      {thisText}
      {thisIcon}
      {thisList}
    </SemanticUI>
  );
};

Dropdown.defaultProps = {
  icon: true,
  simple: true,
};

export default Dropdown;

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
    marginTop: -1, //aviod not expected hover out
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
  hoverMenu: [
    {
      display: "block !important",
    },
    [
      ".ui.simple.dropdown.active>.menu",
      ".ui.simple.dropdown:hover>.menu",
    ].join(","),
  ],
};
