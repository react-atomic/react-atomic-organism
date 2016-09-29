import React, {Component} from 'react'; 
import {
    assign,
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';


export default class Items extends Component
{
    render()
    {
        let classes = mixClass(
            this.props.className
            ,'items'
        );
        return (
          <SemanticUI {...this.props} className={classes}>
          {this.renderChildren()}
          </SemanticUI>
        );
    }
    renderChildren()
    {
        return React.Children.map(
            this.props.children,
            ((child, index)=>{
                child = React.cloneElement(
                    child, 
                    assign(
                        {},
                        child.props,
                        {item:true}
                    )
                );
                return child;
            }).bind(this));
    }
}

