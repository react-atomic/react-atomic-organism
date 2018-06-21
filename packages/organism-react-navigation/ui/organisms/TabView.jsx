import React, {cloneElement, isValidElement, PureComponent, Children} from 'react'; 
import {
    mixClass,
    Item,
    SemanticUI
} from 'react-atomic-molecule';

class TabView extends PureComponent
{
    static defaultProps = {
        disableSwitch: false
    }

    static getDerivedStateFromProps({selected}, prevState)
    {
        return {selected};
    }

    constructor(props)
    {
        super(props);
        const {selected} = props;
        this.state = { selected };
    } 

    render()
    {
        const {style, menu, body, disableSwitch, ...props} = this.props;
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
                  const nodeClasses = mixClass(
                    node.props.className,
                    {active: selected}
                  );
                  node = cloneElement(
                      node,
                      {
                          key: nodeKey,
                          selected,
                          className: nodeClasses,
                          onClickCapture: (e) => { 
                              if (!disableSwitch) {
                                  if (!node.props.disableSwitch) {
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
            tabMenu = (
                <SemanticUI className="top attached tabular menu">
                {tabMenuItems}
                </SemanticUI>
            );
        }
        return (
            <SemanticUI style={style}>
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
    }
};
