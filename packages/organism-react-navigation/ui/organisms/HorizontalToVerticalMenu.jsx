import React, { isValidElement, Children, PureComponent } from "react";
import {
  build,
  min,
  lazyInject,
  mixClass,
  mergeStyleConfig,
  reactStyle,
  Icon,
  SemanticUI,
} from "react-atomic-molecule";
import HamburgerIcon from "ricon/HamburgerToX";

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
  class HorizontalToVerticalMenu extends PureComponent {
    state = {
      on: false,
    };

    static defaultProps = {
      component: SemanticUI,
      brand: null,
      nav: null,
      height: 60,
    };

    handleOn = () => {
      this.setState(({ on }) => {
        return { on: !on };
      });
    };

    constructor(props) {
      super(props);
      injects = lazyInject(InjectStyles, injects);
    }

    render() {
      const {
        brand,
        component,
        nav,
        style,
        className,
        children,
        height,
        ...others
      } = this.props;
      const classes = mixClass(className, {
        active: this.state.on,
      });
      let thisChildren = [];
      if (brand) {
        thisChildren.push(
          build(brand)({
            style: {
              ...Styles.brand,
              ...brand.props.style,
              height: height,
            },
            className: mixClass(brand.props.className, "brand"),
            key: "brand",
          })
        );
      }
      if (nav) {
        thisChildren.push(
          build(nav)({
            style: {
              ...Styles.nav,
              ...nav.props.style,
            },
            className: mixClass("nav", nav.props.className),
            key: "nav",
            handleOn: this.handleOn,
          })
        );
      }
      Children.forEach(children, (child, key) => {
        thisChildren.push(build(child)({ key, handleOn: this.handleOn }));
      });
      if (nav) {
        thisChildren.push(
          <Icon
            key="hamburger-icon"
            className="hamburger-icon"
            style={Styles.hamburgerIcon}
            onClick={this.handleOn}
          >
            <HamburgerIcon on={this.state.on} />
          </Icon>
        );
      }
      return build(component)(
        {
          ...others,
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
            null,
            false
          ),
          className: classes,
        },
        thisChildren
      );
    }
  }
  return HorizontalToVerticalMenu;
};

let injects;
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
