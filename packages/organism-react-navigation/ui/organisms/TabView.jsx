import React, {PureComponent, Children} from 'react';
import {mixClass, build, SemanticUI} from 'react-atomic-molecule';

class TabView extends PureComponent {
  state = {};

  static defaultProps = {
    disableSwitch: false,
    stackable: true,
    selected: true,
    body: SemanticUI,
    menu: SemanticUI,
  };

  static getDerivedStateFromProps({selected}, {lastPropsSelected}) {
    if (lastPropsSelected !== selected) {
      return {
        lastPropsSelected: selected,
        selected,
      };
    } else {
      return null;
    }
  }

  render() {
    const {
      id,
      style,
      contentStyle,
      menuStyle,
      menu,
      body,
      disableSwitch,
      stackable,
      rightMenu,
      bottom,
      left,
      right,
      ...props
    } = this.props;
    const tabMenuItems = [];
    let stateSelected = this.state.selected;
    let contentView = null;
    let content = null;
    let tabMenu;
    Children.map(props.children, (item, itemKey) => {
      const itemProps = item.props;

      // detect selected
      const nodeKey = itemProps.name || itemKey;
      if (true === stateSelected) {
        stateSelected = nodeKey;
      }
      const selected = nodeKey === stateSelected;

      Children.map(itemProps.children, (node, index) => {
        if (index % 2 || 1 === Children.count(itemProps.children)) {
          const nodeProps = node.props;
          const nodeClasses = mixClass(nodeProps.className, 'item', {
            active: selected,
          });
          node = build(node)({
            key: nodeKey,
            selected,
            className: nodeClasses,
            style: {...Styles.tabItem, ...nodeProps.style},
            onClickCapture: e => {
              if (!disableSwitch) {
                if (!nodeProps.disableSwitch) {
                  this.setState({selected: nodeKey});
                }
              }
              if (props.onTabItemPress) {
                props.onTabItemPress(nodeKey);
              }
            },
          });
          tabMenuItems.push(node);
        } else {
          if (selected) {
            contentView = node;
          }
        }
      });
    });
    // Tab Menu
    if (rightMenu) {
      tabMenuItems.push(build(rightMenu)({key: 'r-menu'}));
    }
    const menuOpt = {
      top: !bottom && !left && !right,
      bottom,
      vertical: left || right,
      stackable,
    };
    const menuClasses = mixClass('attached tabular menu', menuOpt);
    tabMenu = build(menu)(
      {
        key: 'menu',
        style: menuStyle,
        className: menuClasses,
      },
      tabMenuItems,
    );
    if (contentView) {
      // Tab Body
      const contentClasses = mixClass('attached tab segment active', {
        top: !menuOpt.top,
        bottom: menuOpt.top,
      });
      content = build(body)(
        {
          key: 'content',
          style: {...Styles.tabBody, ...contentStyle},
          className: contentClasses,
        },
        contentView,
      );
    }
    const childOrder = menuOpt.top ? [tabMenu, content] : [content, tabMenu];
    return (
      <SemanticUI style={style} id={id}>
        {childOrder}
      </SemanticUI>
    );
  }
}

export default TabView;

const Styles = {
  tabBody: {
    boxSizing: 'border-box',
  },
  tabItem: {
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
};
