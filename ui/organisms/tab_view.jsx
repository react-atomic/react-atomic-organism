import React, {Component} from 'react'; 
import {
    assign,
    mixClass,
    Item,
    SemanticUI
} from 'react-atomic-molecule';

export default class TabView extends Component
{
    
   constructor(props)
   {
      super(props);
      this.state = {
         selected: props.selected
      };

   } 

   componentWillReceiveProps(newProps) {
        this.setState({selected: newProps.selected});
   }

    render()
    {
        let props = this.props;
        let state = this.state;
        let itemList = [];
        let contentView = null;
        let content = null;
        let tabMenu;
        React.Children.map(props.children,(item)=>{
            let itemProps = item.props;
            let selected = (itemProps.name && itemProps.name === state.selected);
            React.Children.map(itemProps.children,(node, index)=>{
               if (index % 2 === 0) {
                  if (selected) {
                    contentView = node;
                  } 
                } else {
                  let nodeClasses = mixClass(
                    node.props.className,
                    {active: selected}
                  );
                  node = React.cloneElement(node, assign({}, node.props, {
                    key: item.props.name,
                    selected: selected,
                    className: nodeClasses,
                    onClickCapture: function(e) { 
                        if (!props.disableSwitch) {
                            if (!node.props.disableSwitch) {
                                this.setState({selected: item.props.name});
                            }
                        }
                        if (props.onTabItemPress) {
                            props.onTabItemPress(item.props.name) 
                        }
                    }.bind(this)
                  })); 
                  itemList.push(node);
                } 
            })
        });
        if (contentView) {
            // Tab Body
            if (React.isValidElement(props.body)) {
              content = React.cloneElement(props.body, props, contentView);
            } else if (typeof props.body === 'function') {
              content = props.body(props, contentView);
            } else {
              content = (
                <SemanticUI className="bottom attached tab segment active">
                    {contentView}        
                </SemanticUI>
              );
            }
        }
        // Tab Menu
        if (React.isValidElement(props.menu)) {
          tabMenu = React.cloneElement(props.menu, props, itemList);
        } else if (typeof props.menu === 'function') {
          tabMenu = props.menu(props, itemList);
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
