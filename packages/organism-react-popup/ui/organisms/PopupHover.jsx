import React, {Component} from 'react'; 
import getOffset from 'getoffset';
import {
    assign,
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

import {
    popupDispatch,
    PopupOverlay
} from '../../src/index';

export default class Popup extends Component
{
   constructor(props)
   {
      super(props);
      this.state = {
         popup: false,
         popupStyle: {},
         popupClass: '' 
      };
   } 

    mouseOver()
    {
        let dom = ReactDOM.findDOMNode(this.dom); 
        let bodyWidth = document.body.clientWidth;
        console.log('over');
        let domOffset = getOffset(dom);
        let popupClass = 'visible bottom left';
        let popupStyle = {
            //top: domOffset.top+'px', 
            top: window.scrollY+10+'px', 
            left: '5px'
        };
        let props = this.props;
        let popup = null;
        if (props.popup) {
            let classes = mixClass(
                popupClass,
                props.popup.props.className
            );
            let popupProps = {
                className: classes,
                style: popupStyle
            };
            if (React.isValidElement(props.popup)) {
              popup = React.cloneElement(props.popup, popupProps);
            } else if (typeof props.popup === 'function') {
              popup = props.popup(popupProps);
            } else {
              popup = <PopupOverlay {...popupProps}>{props.popup}</PopupOverlay>; 
            }
        }
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: popup 
            }
        });
    }

    mouseOut()
    {
        popupDispatch({
            type: 'dom/close'
        });
    }

    render()
    {
        return (
        <SemanticUI
           ref={dom=>this.dom=dom}
           onMouseEnter={this.mouseOver.bind(this)} 
           onMouseLeave={this.mouseOut.bind(this)} 
           style={{position:'relative'}}
           {...this.props}
        />
        );
    }
}
