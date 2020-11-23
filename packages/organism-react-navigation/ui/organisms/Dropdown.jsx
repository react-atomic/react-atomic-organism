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
  lazyInject,
  mixClass,
  SemanticUI,
  Icon,
  Item,
} from "react-atomic-molecule";
import DropdownIcon from "ricon/Dropdown";
import { doc } from "win-doc";

const Dropdown = (props) => {
  const {
    list,
    listStyle,
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

  const titleTimer = useRef();
  const menuTimer = useRef();
  const handleClose = useRef();
  const thisEl = useRef();
  const listEl = useRef();
  const isActive = useRef();
  const isListClick = useRef();
  const [stateListStyle, setStateListStyle] = useState({});
  const [hideList, setHideList] = useState(false);

  const expose = {
    open: () => {
      const listStyle = {};
      if (simple) {
        listStyle.visibility = "hidden";
        titleTimer.current = setTimeout(() => {
          listStyle.visibility = "inherit";
          setStateListStyle({ ...listStyle });
        }, 300);
      }
      doc().addEventListener("click", handleClose.current);
      listStyle.display = "block";
      isActive.current = true;
      setStateListStyle(listStyle);
    },
    close: () => {
      doc().removeEventListener("click", handleClose.current);
      isActive.current = false;
      setStateListStyle({});
    },
  };

  useEffect(() => {
    handleClose.current = (e) => {
      const target = e.target;
      if (thisEl.current.contains(target)) {
        return;
      }
      expose.close();
    };
    injects = lazyInject(injects, InjectStyles);
    return () => {
      if (titleTimer.current) {
        clearTimeout(titleTimer.current);
      }
      if (menuTimer.current) {
        clearTimeout(menuTimer.current);
      }
      if (!simple) {
        doc().removeEventListener("click", handleClose.current);
      }
    };
  }, []);

  const isOpen = () => {
    if (simple) {
      return get(listEl.current, ["style", "display"]) !== "";
    } else {
      return isActive.current;
    }
  };

  const handleListTouchStart = (e) => {
    if (!isOpen()) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleListClick = (e) => {
    if (simple) {
      if (!isOpen()) {
        setTimeout(() => {
          setHideList(true);
          menuTimer.current = setTimeout(() => setHideList(false), 500);
        });
      }
    } else {
      expose.close();
    }
    isListClick.current = true;
  };

  const handleDropdownClick = (e) => {
    if (!isListClick.current) {
      if (!isOpen()) {
        expose.open();
      }
    } else {
      isListClick.current = false;
    }
  };

  const handleThisEl = (el) => {
    thisEl.current = el;
  };

  const handleListEl = (el) => {
    listEl.current = el;
  };

  let thisList = null;
  if (!hideList && list) {
    thisList = build(list)({
      style: {
        ...Styles.list,
        ...listStyle,
        ...stateListStyle,
      },
      refCb: handleListEl,
      onClick: handleListClick,
      onTouchStart: handleListTouchStart,
    });
  }
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
  const textClasses = mixClass("text", textClassName);
  const thisText = (
    <SemanticUI
      className={textClasses}
      style={{ ...Styles.label, ...titleStyle }}
    >
      {children}
    </SemanticUI>
  );
  const classes = mixClass(className, "dropdown", {
    active: isActive.current,
    simple,
  });
  return (
    <SemanticUI
      {...others}
      style={{ ...Styles.container, ...style }}
      className={classes}
      refCb={handleThisEl}
      onClick={handleDropdownClick}
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
