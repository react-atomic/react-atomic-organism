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

    constructor(props)
    {
        super(props);
        const {selected} = props;
        this.state = { selected };
    } 

   componentWillReceiveProps({selected}) {
       this.setState({selected});
   }

    render()
    {
        const {menu, body, disableSwitch, ...props} = this.props;
        let state = this.state;
        let itemList = [];
        let contentView = null;
        let content = null;
        let tabMenu;
        Children.map(props.children,(item, itemKey)=>{
            let itemProps = item.props;
            const nodeKey = itemProps.name || itemKey;
            let selected = (nodeKey === state.selected);
            Children.map(itemProps.children,(node, index)=>{
               if (index % 2 === 0) {
                  if (selected) {
                    contentView = node;
                  } 
                } else {
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
                  itemList.push(node);
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
            tabMenu = cloneElement(menu, props, itemList);
        } else if (typeof menu === 'function') {
            tabMenu = menu(props, itemList);
        } else {
            tabMenu = (
                <SemanticUI className="top attached tabular menu">
                {itemList}
                </SemanticUI>
            );
        }
        return (
            <SemanticUI>
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
