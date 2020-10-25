import React, { cloneElement, isValidElement, PureComponent } from "react";
import get from "get-object-value";
import {
  lazyInject,
  mixClass,
  SemanticUI,
  Icon,
  Menu,
  Item,
} from "react-atomic-molecule";
import DropdownIcon from "ricon/Dropdown";
import { doc } from "win-doc";

const body = () => doc().body;

class Dropdown extends PureComponent {
  static defaultProps = {
    icon: true,
    simple: true,
  };

  menuTimer = null;
  titleTimer = null;

  state = {
    listStyle: {},
    hideList: false,
  };

  handleTitleClick = (e) => {
    const { listStyle } = this.state;
    if (listStyle.display === "block") {
      this.close();
    } else {
      this.open();
    }
  };

  handleMenuClick = () => {
    const { simple } = this.props;
    if (simple) {
      setTimeout(() => {
        if ("hidden" !== get(this, ["state", "listStyle", "visibility"])) {
          this.setState({
            hideList: true,
          });
          this.menuTimer = setTimeout(
            () =>
              this.setState({
                hideList: false,
              }),
            300
          );
        }
      });
    } else {
      this.close();
    }
  };

  handleClose = (e) => {
    const target = e.target;
    if (this.menu.contains(target)) {
      return;
    }
    this.close();
  };

  open() {
    const { simple } = this.props;
    const listStyle = {};
    if (simple) {
      listStyle.visibility = "hidden";
      this.titleTimer = setTimeout(() => {
        listStyle.visibility = "inherit";
        this.setState({
          listStyle: { ...listStyle },
        });
      }, 300);
    } else {
      body().addEventListener("click", this.handleClose);
      listStyle.display = "block";
    }
    this.setState({ listStyle });
  }

  close() {
    const { simple } = this.props;
    if (!simple) {
      body().removeEventListener("click", this.handleClose);
    }
    this.setState({ listStyle: {} });
  }

  constructor(props) {
    super(props);
    injects = lazyInject(injects, InjectStyles);
  }

  componentWillUnmount() {
    if (this.titleTimer) {
      clearTimeout(this.titleTimer);
    }
    if (this.menuTimer) {
      clearTimeout(this.menuTimer);
    }
    const { simple } = this.props;
    if (!simple) {
      body().removeEventListener("click", this.handleClose);
    }
  }

  render() {
    const {
      list,
      listStyle,
      titleStyle,
      iconStyle,
      icon,
      children,
      style,
      className,
      simple,
      ...props
    } = this.props;
    const { listStyle: stateListStyle, hideList } = this.state;
    let thisList = null;
    if (!hideList && list) {
      thisList = cloneElement(list, {
        style: {
          ...Styles.list,
          ...listStyle,
          ...stateListStyle,
        },
        onClick: this.handleMenuClick,
      });
    }
    let thisIcon = null;
    if (icon) {
      if (!isValidElement(icon)) {
        thisIcon = (
          <Icon
            className="dropdown-default-icon"
            style={{ ...Styles.icon, ...iconStyle }}
          >
            <DropdownIcon />
          </Icon>
        );
      } else {
        thisIcon = icon;
      }
    }
    const classes = mixClass(className, "compact");
    const titleClasses = mixClass("dropdown", { simple });
    return (
      <Menu
        {...props}
        style={{ ...Styles.container, ...style }}
        className={classes}
        refCb={(el) => (this.menu = el)}
        onClick={this.handleTitleClick}
      >
        <Item
          className={titleClasses}
          style={{ ...Styles.title, ...titleStyle }}
        >
          <SemanticUI style={Styles.label}>
            {children}
            {thisIcon}
          </SemanticUI>
          {thisList}
        </Item>
      </Menu>
    );
  }
}

export default Dropdown;

const Styles = {
  container: {
    border: "none",
    boxShadow: "none",
    minHeight: "auto",
    background: "none",
  },
  title: {
    padding: 0,
  },
  label: {
    display: "inherit",
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: -5,
  },
  list: {
    marginTop: -1, //aviod not expected hover out
    maxHeight: "50vh",
    overflow: "auto",
  },
};

let injects;
const InjectStyles = {
  defaultIcon: [
    {
      transform: ["rotate(180deg)"],
    },
    ".ui.simple.dropdown:hover .dropdown-default-icon",
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
      ".ui.simple.active.dropdown>.menu",
      ".ui.simple.dropdown:hover>.menu",
    ].join(","),
  ],
};
