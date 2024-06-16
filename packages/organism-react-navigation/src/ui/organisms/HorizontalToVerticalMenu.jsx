// @ts-check
import * as React from "react";
const { Children, useState } = React;
import {
  build,
  min,
  useLazyInject,
  mixClass,
  mergeStyleConfig,
  reactStyle,
  Icon,
  SemanticUI,
} from "react-atomic-molecule";
import HamburgerIcon from "ricon/HamburgerToX";
import get from "get-object-value";

/**
 * @typedef {import('reshow-build').Component} Component
 */

/**
 * @typedef {object} HorizontalToVerticalMenuProps
 * @property {string=} className
 * @property {Component=} brand
 * @property {Component=} nav
 * @property {number=} height
 * @property {Component=} component
 * @property {React.CSSProperties=} style
 * @property {React.Children=} children
 */

/**
 * @param {{[key: string]:React.CSSProperties}} Styles
 * @param {boolean} [merge]
 */
export const getHorizontalToVerticalMenu = (Styles, merge) => {
  const InjectStyles = {
    headerActive: [
      {
        maxHeight: "1000px !important",
      },
      ".page-header.active",
    ],
    navActive: [
      {
        display: "block !important",
      },
      ".page-header.active .nav",
    ],
    lgHeaderNav: [
      {
        display: [
          "inline-flex !important",
          "-webkit-inline-box !important",
          "-ms-inline-flexbox !important",
        ],
      },
      [min.lg, ".page-header .nav, .page-header.active .nav"],
    ],
    lgHamburgerIcon: [
      {
        display: "none !important",
      },
      [min.lg, ".page-header .hamburger-icon"],
    ],
  };
  if (merge) {
    mergeStyleConfig(Styles, defaultStyles, InjectStyles);
  }

  /**
   * @param {HorizontalToVerticalMenuProps} props
   * @returns {{ restProps: HorizontalToVerticalMenuProps, handler: {[key: string]: Function}, className: string, active: boolean }}
   */
  const useHorizontalToVerticalMenu = (props) => {
    const { className, ...restProps } = props;
    const [active, setActive] = useState(false);
    injects = useLazyInject(InjectStyles, injects);
    const classes = mixClass(className, {
      active,
    });
    const handler = {
      on: () => {
        setActive((prevActive) => !prevActive);
      },
    };
    return { restProps, handler, className: classes, active };
  };

  /**
   * @param {HorizontalToVerticalMenuProps} props
   */
  const HorizontalToVerticalMenu = (props) => {
    const { restProps, handler, className, active } =
      useHorizontalToVerticalMenu(props);

    const {
      brand = null,
      nav = null,
      height = 60,
      component = SemanticUI,
      style,
      children,
      ...uiRestProps
    } = restProps;
    const thisChildren = [];
    if (brand) {
      thisChildren.push(
        build(brand)({
          style: {
            ...Styles.brand,
            ...get(brand, ["props", "style"]),
            height: height,
          },
          className: mixClass(get(brand, ["props", "className"]), "brand"),
          key: "brand",
        })
      );
    }
    if (nav) {
      thisChildren.push(
        build(nav)({
          style: {
            ...Styles.nav,
            ...get(nav, ["props", "style"]),
          },
          className: mixClass("nav", get(nav, ["props", "className"])),
          key: "nav",
          handleOn: handler.on,
        })
      );
    }
    Children.forEach(children, (child, key) => {
      thisChildren.push(
        build(/**@type any*/ (child))({ key, handleOn: handler.on })
      );
    });
    if (nav) {
      thisChildren.push(
        <Icon
          key="hamburger-icon"
          className="hamburger-icon"
          style={Styles.hamburgerIcon}
          onClick={handler.on}
        >
          <HamburgerIcon on={active} />
        </Icon>
      );
    }
    return build(component)(
      {
        ...uiRestProps,
        styles: reactStyle(
          {
            ...Styles.container,
            ...style,
            maxHeight: height,
            transition: [
              ["padding 300ms linear", "max-height 300ms ease-in-out"].join(
                ", "
              ),
            ],
          },
          undefined,
          false
        ),
        className,
      },
      thisChildren
    );
  };
  return HorizontalToVerticalMenu;
};

let injects;
/**
 * @type {{[key: string]: React.CSSProperties}}
 */
const defaultStyles = {
  hamburgerIcon: {
    position: "absolute",
    top: 10,
    right: 30,
    width: 35,
    height: 35,
    fill: "#fff",
    cursor: "pointer",
  },
  container: {
    position: "relative",
    maxHeight: 60,
    overflow: "hidden",
    boxSizing: "border-box",
  },
  nav: {
    display: "none",
  },
};

export default getHorizontalToVerticalMenu(defaultStyles);
