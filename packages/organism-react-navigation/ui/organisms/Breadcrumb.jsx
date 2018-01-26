import React, {Component} from 'react'; 

import {
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

import get from 'get-object-value';

class Breakcrumb extends Component
{
    render()
    {
        const {className, children, divider, dividerStyle, ...reset} = this.props;
        const itemList = []; 
        let thisDivider;
        if (React.isValidElement(divider)) {
            thisDivider = divider;
        } else {
            thisDivider = <SemanticUI> / </SemanticUI>;
        }
        React.Children.map(children,(node, k)=>{
            if (!node) {
                return;
            } else if (!React.isValidElement(node)) {
                node = <SemanticUI>{node}</SemanticUI>;
            }
            node = React.cloneElement(
                node, 
                {
                    key: k,
                    className: mixClass(
                        get(node, ['props','className']),
                        'section'
                    )
                }
            );
            itemList.push(node);  
            node = React.cloneElement(
                thisDivider, 
                {
                    key: k+'-div',
                    className: mixClass(thisDivider.props.className, 'divider'),
                    style: {
                        ...thisDivider.props.style,
                        ...dividerStyle
                    }
                }
            );
            itemList.push(node);
        });
        if (itemList.length) {
            itemList.pop();
        }
        return (
            <SemanticUI {...reset} className={mixClass('breadcrumb', className)}>
                {itemList}
            </SemanticUI>
        );
    }
}
export default Breakcrumb;
