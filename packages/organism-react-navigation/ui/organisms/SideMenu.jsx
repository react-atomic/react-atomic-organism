import { useEffect, useCallback, useRef } from "react";
import {
  build,
  mixClass,
  reactStyle,
  Icon,
  Rail,
  SemanticUI,
} from "react-atomic-molecule";
import { useStore } from "reshow-flux";
import Hamburger from "ricon/HamburgerToArrow";
import { toJS } from "get-object-value";
import { hasClass, removeClass } from "class-lib";
import { queryOne } from "css-query-selector";
import getOffset from "getoffset";
import callfunc from "call-func";
import { KEYS } from "reshow-constant";

import navigationStore, {
  navigationDispatch,
} from "../../src/stores/navigationStore";

const getMenuByArray = (onClick) => (arr, component, type, menuOrder) => {
  if (!arr) {
    return null;
  }
  const results = [];
  const buildComp = build(component);
  (menuOrder || KEYS(arr)).forEach((key) => {
    results.push(
      <SideMenuItem
        {...arr[key]}
        key={key}
        type={type}
        name={key}
        onClick={onClick}
        buildComp={buildComp}
      />
    );
  });
  return results;
};

const SideMenuItem = (props) => {
  const { buildComp, className, name, text, type, ...others } = props;
  const lastV = useRef();
  const active = useStore(navigationStore, (emit = {}) => {
    const { storeState, notify } = emit.current || {};
    if (emit.current) {
      const { activeMenu } = storeState.get(type);
      if (name !== activeMenu && lastV.current) {
        emit.current.state = false;
        notify();
      } else if (name === activeMenu) {
        emit.current.state = true;
        notify();
        lastV.current = true;
      }
    } else {
      return false;
    }
  });
  const classes = mixClass(className, "item", { active });
  return buildComp(
    {
      ...others,
      className: classes,
      name,
    },
    text
  );
};

const DefaultIcon = ({
  className,
  on,
  right,
  onClick,
  iconStyle,
  hamburgerStyle,
}) => (
  <Icon
    onClick={onClick}
    className={mixClass(className, "hamburger-icon")}
    styles={reactStyle(
      {
        ...Styles.icon,
        ...iconStyle,
      },
      false,
      false
    )}
  >
    <Hamburger
      on={on}
      right={right}
      styles={reactStyle(
        {
          ...Styles.hamburger,
          ...hamburgerStyle,
        },
        false,
        false
      )}
    />
  </Icon>
);

const SideMenuContainer = ({
  children,
  type,
  onSwitch,
  lastOn,
  updateRoot,
  defaultOnIcon,
  defaultOffIcon,
  iconStyle,
  hamburgerStyle,
  className,
  shrink,
}) => {
  const on = useStore(navigationStore, (emit = {}) => {
    const { storeState, notify } = emit.current || {};
    if (emit.current) {
      const { on } = storeState.get(type);
      if (lastOn.current !== on) {
        emit.current.state = on;
        notify();
        lastOn.current = on;
        updateRoot(on);
      }
    } else {
      return lastOn.current;
    }
  });
  const isInit = null == on;

  // setup thisDefaultOffIcon
  const defaultOff = isInit ? false : on;
  let thisDefaultOffIcon = defaultOffIcon;
  if (!thisDefaultOffIcon) {
    thisDefaultOffIcon = <DefaultIcon />;
  }
  thisDefaultOffIcon = build(thisDefaultOffIcon)({
    on: defaultOff,
    onClick: onSwitch(defaultOff),
    className: "default-off",
    iconStyle,
    hamburgerStyle,
  });

  // setup thisDefaultOnIcon
  let thisDefaultOnIcon = null;
  if (shrink) {
    let defaultOn = isInit ? true : on;
    thisDefaultOnIcon = defaultOnIcon;
    if (!thisDefaultOnIcon) {
      thisDefaultOnIcon = <DefaultIcon />;
    }
    thisDefaultOnIcon = build(thisDefaultOnIcon)({
      on: true,
      right: !defaultOn,
      onClick: onSwitch(defaultOn),
      className: "default-on",
      iconStyle,
      hamburgerStyle,
    });
  }

  const classes = mixClass(
    {
      active: on,
      inactive: on === false,
    },
    "sidebar-menu",
    className
  );
  return (
    <Rail className={classes}>
      {children}
      {thisDefaultOnIcon}
      {thisDefaultOffIcon}
    </Rail>
  );
};

const useSideMenu = (props) => {
  const {
    type = "default",
    component = SemanticUI,
    linkComponent = "a",
    menus = [],
    rootActiveClass = "side-menu-active",
    rootInactiveClass = "side-menu-inactive",
    root,
    on: propsOn,
    onSwitch,
    defaultOnIcon,
    defaultOffIcon,
    iconStyle,
    hamburgerStyle,
    className,
    menuOrder,
    shrink,
    ...others
  } = props || {};
  const lastOn = useRef();

  useEffect(() => {
    if (null != propsOn) {
      navigationDispatch(type, { on: propsOn });
    }
  }, [propsOn]);

  useEffect(() => {
    return () => {
      const thisRoot = getRoot();
      thisRoot.className = removeClass(thisRoot.className, rootActiveClass);
      thisRoot.className = removeClass(thisRoot.className, rootInactiveClass);
    };
  }, []);

  const getRoot = useCallback(() => root ?? document.body, [root]);

  const updateRoot = useCallback(
    (on) => {
      const thisRoot = getRoot();
      if (!thisRoot) {
        console.wanr("root not found");
        return;
      }
      if (on) {
        thisRoot.className = mixClass(thisRoot.className, rootActiveClass);
        thisRoot.className = removeClass(thisRoot.className, rootInactiveClass);
      } else {
        thisRoot.className = mixClass(thisRoot.className, rootInactiveClass);
        thisRoot.className = removeClass(thisRoot.className, rootActiveClass);
      }
    },
    [rootActiveClass, rootInactiveClass]
  );

  const handleSwitch = useCallback(
    (stateOn) => (e) => {
      const isValidStateOn = "boolean" === typeof stateOn;
      const on = !(isValidStateOn ? stateOn : lastOn.current);
      const defaultOff = getOffset(queryOne(".sidebar-menu .default-off"));
      const isSet = isValidStateOn || (defaultOff.w && defaultOff.h);
      if (isSet) {
        navigationDispatch(type, { on });
      }
      e.on = on;
      e.isSet = isSet;
      callfunc(onSwitch, [e, on, isSet]);
    },
    [type, onSwitch]
  );

  const menuItems = getMenuByArray(handleSwitch())(
    toJS(menus),
    linkComponent,
    type,
    toJS(menuOrder)
  );

  return {
    menuItems,
    component,
    type,
    handleSwitch,
    lastOn,
    updateRoot,
    defaultOnIcon,
    defaultOffIcon,
    iconStyle,
    hamburgerStyle,
    className,
    shrink,
    others,
  };
};

const SideMenu = (props) => {
  const {
    menuItems,
    component,
    type,
    handleSwitch,
    lastOn,
    updateRoot,
    defaultOnIcon,
    defaultOffIcon,
    iconStyle,
    hamburgerStyle,
    className,
    shrink,
    others,
  } = useSideMenu(props);
  const menuElement = build(component)(others, menuItems);
  return (
    <SideMenuContainer
      type={type}
      onSwitch={handleSwitch}
      lastOn={lastOn}
      updateRoot={updateRoot}
      defaultOnIcon={defaultOnIcon}
      defaultOffIcon={defaultOffIcon}
      iconStyle={iconStyle}
      hamburgerStyle={hamburgerStyle}
      className={className}
      shrink={shrink}
    >
      {menuElement}
    </SideMenuContainer>
  );
};

export default SideMenu;

const Styles = {
  icon: {
    display: null,
    background: "#000",
    padding: 5,
    width: 24,
    height: 24,
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1,
    cursor: "pointer",
    opacity: ".5",
    transition: ["all 0.2s ease-out"],
  },
  hamburger: {
    fill: "#fff",
  },
};
