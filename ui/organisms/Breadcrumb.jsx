import React, {Component} from 'react'; 

import {
    assign,
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

import get from 'get-object-value';

class Breakcrumb extends Component
{
    render()
    {
        const {children, divider, ...reset} = this.props;
        let itemList = []; 
        let classes;
        let myDivider;
        if (React.isValidElement(divider)) {
            myDivider = divider;
        } else {
            myDivider = <div className="divider"> / </div>;
        }
        React.Children.map(children,(node, k)=>{
            if (!node) {
                return;
            }
            classes = mixClass(
                get(node, ['props','className']),
                'section'
            );
            node = React.cloneElement(
                node, 
                {
                    key: k,
                    className: classes
                }
            );
            itemList.push(node);  
            node = React.cloneElement(
                myDivider, 
                {
                    key: k+'-div',
                }
            );
            itemList.push(node);
        });
        if (itemList.length) {
            itemList.pop();
        }
        return (
            <SemanticUI {...reset} className="breadcrumb">
                {itemList}
            </SemanticUI>
        );
    }
}
export default Breakcrumb;
