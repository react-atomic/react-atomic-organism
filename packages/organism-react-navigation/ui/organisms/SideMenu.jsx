import React, { useEffect, useCallback, useRef } from "react";
import {
  build,
  mixClass,
  reactStyle,
  Icon,
  Rail,
  SemanticUI,
} from "react-atomic-molecule";
import Return from "reshow-return";
import Hamburger from "ricon/HamburgerToArrow";
import get from "get-object-value";
import { hasClass, removeClass } from "class-lib";
import { queryOne } from "css-query-selector";
import getOffset from "getoffset";
import callfunc from "call-func";

import navigationStore, {
  navigationDispatch,
} from "../../src/stores/navigationStore";

const keys = Object.keys;

const getMenuByArray = (onClick) => (arr, component, active, menuOrder) => {
  if (!arr) {
    return null;
  }
  const results = [];
  const buildComp = build(component);
  if (!menuOrder) {
    menuOrder = keys(arr);
  }
  menuOrder.forEach((key) => {
    const { href, text, className, ...others } = arr[key];
    const classes = mixClass(className, "item", {
      active: active === key,
    });
    results.push(
      buildComp(
        {
          ...others,
          key,
          href,
          name: key,
          className: classes,
          onClick,
        },
        text
      )
    );
  });
  return results;
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

const SideMenu = (props) => {
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
    keepMini,
    ...others
  } = props || {};

  const lastOn = useRef();

  useEffect(() => {
    if (null != propsOn) {
      navigationDispatch(type, { on: propsOn });
    }
  }, [propsOn]);

  useEffect(() => {
    if (null != lastOn.current) {
      updateRoot(lastOn.current);
    }
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

  return (
    <Return store={navigationStore} initStates={[type]}>
      {({ [type]: settings }) => {
        const { on, activeMenu } = settings || {};
        if (lastOn.current !== on) {
          updateRoot(on);
          lastOn.current = on;
        }
        const isInit = null == on;
        const menuItems = getMenuByArray(handleSwitch())(
          get(menus),
          linkComponent,
          activeMenu,
          get(menuOrder)
        );
        const menuElement = build(component)(others, menuItems);

        // setup thisDefaultOffIcon
        const defaultOff = isInit ? false : on;
        let thisDefaultOffIcon = defaultOffIcon;
        if (!thisDefaultOffIcon) {
          thisDefaultOffIcon = <DefaultIcon />;
        }
        thisDefaultOffIcon = build(thisDefaultOffIcon)({
          on: defaultOff,
          onClick: handleSwitch(defaultOff),
          className: "default-off",
          iconStyle,
          hamburgerStyle,
        });

        // setup thisDefaultOnIcon
        let thisDefaultOnIcon = null;
        if (!keepMini) {
          let defaultOn = isInit ? true : on;
          thisDefaultOnIcon = defaultOnIcon;
          if (!thisDefaultOnIcon) {
            thisDefaultOnIcon = <DefaultIcon />;
          }
          thisDefaultOnIcon = build(thisDefaultOnIcon)({
            on: true,
            right: !defaultOn,
            onClick: handleSwitch(defaultOn),
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
            {menuElement}
            {thisDefaultOnIcon}
            {thisDefaultOffIcon}
          </Rail>
        );
      }}
    </Return>
  );
};

export default SideMenu;

const Styles = {
  icon: {
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
