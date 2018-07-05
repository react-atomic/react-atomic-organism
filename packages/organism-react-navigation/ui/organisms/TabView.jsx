import React, {cloneElement, isValidElement, PureComponent, Children} from 'react'; 
import {
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

class TabView extends PureComponent
{
    state = {}

    static defaultProps = {
        disableSwitch: false,
        stackable: true,
        selected: 0
    }

    static getDerivedStateFromProps({selected}, {lastPropsSelected})
    {
        if (lastPropsSelected !== selected) {
            return {
                lastPropsSelected: selected,
                selected
            }
        } else {
            return null
        }
    }

    render()
    {
        const {id, style, menuStyle, menu, body, disableSwitch, stackable, rightMenu, ...props} = this.props;
        const tabMenuItems = [];
        let state = this.state;
        let contentView = null;
        let content = null;
        let tabMenu;
        Children.map(props.children,(item, itemKey)=>{
            let itemProps = item.props;
            const nodeKey = itemProps.name || itemKey;
            let selected = (nodeKey === state.selected);
            Children.map(itemProps.children,(node, index)=>{
               if (index % 2 || 1 === Children.count(itemProps.children)) {
                  const nodeProps = node.props
                  const nodeClasses = mixClass(
                    nodeProps.className,
                    'item',
                    {active: selected}
                  )
                  node = cloneElement(
                      node,
                      {
                          key: nodeKey,
                          selected,
                          className: nodeClasses,
                          style: {...Styles.tabItem, ...nodeProps.style},
                          onClickCapture: (e) => { 
                              if (!disableSwitch) {
                                  if (!nodeProps.disableSwitch) {
                                      this.setState({selected: nodeKey});
                                  }
                              }
                              if (props.onTabItemPress) {
                                  props.onTabItemPress(nodeKey) 
                              }
                          }
                      }
                  ); 
                  tabMenuItems.push(node);
                } else {
                    if (selected) {
                        contentView = node;
                    } 
                }
            })
        });
        if (contentView) {
            // Tab Body
            if (isValidElement(body)) {
              content = cloneElement(body, props, contentView);
            } else if (typeof body === 'function') {
              content = body(props, contentView);
            } else {
              content = (
                <SemanticUI className="bottom attached tab segment active" style={Styles.tabBody}>
                    {contentView}        
                </SemanticUI>
              );
            }
        }
        // Tab Menu
        if (isValidElement(menu)) {
            tabMenu = cloneElement(menu, props, tabMenuItems);
        } else if (typeof menu === 'function') {
            tabMenu = menu(props, tabMenuItems);
        } else {
            const menuClasses = mixClass(
                'top attached tabular menu',
                {
                   stackable: stackable 
                }
            )
            tabMenu = (
                <SemanticUI style={menuStyle} className={menuClasses}>
                {tabMenuItems}
                {rightMenu}
                </SemanticUI>
            );
        }
        return (
            <SemanticUI style={style} id={id}>
                {tabMenu}
                {content}
            </SemanticUI>
        );
    }
}

export default TabView;

const Styles = {
    tabBody: {
        boxSizing: 'border-box'
    },
    tabItem: {
        boxSizing: 'border-box',
        cursor: 'pointer'
    }
};
