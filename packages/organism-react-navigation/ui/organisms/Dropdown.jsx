import React, {cloneElement, isValidElement, PureComponent} from 'react';
import get from 'get-object-value';
import {
  lazyInject,
  mixClass,
  SemanticUI,
  Icon,
  Menu,
  Item,
} from 'react-atomic-molecule';
import DropdownIcon from 'ricon/Dropdown';

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

  handleTitleClick = e => {
    this.setState({
      listStyle: {visibility: 'hidden'},
    });
    this.titleTimer = setTimeout(
      () =>
        this.setState({
          listStyle: {visibility: 'inherit'},
        }),
      300,
    );
  };

  handleMenuClick = () => {
    setTimeout(() => {
      if ('hidden' !== get(this, ['state', 'listStyle', 'visibility'])) {
        this.setState({
          hideList: true,
        });
        this.menuTimer = setTimeout(
          () =>
            this.setState({
              hideList: false,
            }),
          300,
        );
      }
    });
  };

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
    const {listStyle: stateListStyle, hideList} = this.state;
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
          <Icon className="dropdown-default-icon" style={{...Styles.icon, ...iconStyle}}>
            <DropdownIcon />
          </Icon>
        );
      } else {
        thisIcon = icon;
      }
    }
    const classes = mixClass(className, 'compact');
    const titleClasses = mixClass('dropdown', {simple});
    return (
      <Menu
        {...props}
        style={{...Styles.container, ...style}}
        className={classes}
        onClick={this.handleMenuClick}
        refCb={el => (this.menu = el)}>
        <Item
          className={titleClasses}
          style={{...Styles.title, ...titleStyle}}>
          <SemanticUI style={Styles.label} onClick={this.handleTitleClick}>
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
    border: 'none',
    boxShadow: 'none',
    minHeight: 'auto',
    background: 'none',
  },
  title: {
    padding: 0,
  },
  label: {
    display: 'inherit',
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: -5,
  },
  list: {
    marginTop: -1, //aviod not expected hover out
    maxHeight: '50vh',
    overflow: 'auto',
  },
};

let injects;
const InjectStyles = {
  defaultIcon: [
    {
      transform: ['rotate(180deg)'],
    },
    '.ui.simple.dropdown:hover .dropdown-default-icon',
  ],
  initMenu: [
    {
      display: 'none !important',
    },
    '.ui.simple.dropdown .menu',
  ],
  hoverMenu: [
    {
      display: 'block !important',
    },
    [
      '.ui.simple.active.dropdown>.menu',
      '.ui.simple.dropdown:hover>.menu',
    ].join(','),
  ],
};
