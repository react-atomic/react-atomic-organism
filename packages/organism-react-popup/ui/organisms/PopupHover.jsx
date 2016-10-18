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

class PopupHover extends Component
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
        const props = this.props;
        let popup = props.popup;
        if (popup) {
            const classes = mixClass(
                popupClass,
                popup.props.className
            );
            const popupProps = {
                className: classes,
                style: popupStyle
            };
            if (React.isValidElement(popup)) {
              popup = React.cloneElement(popup, popupProps);
            } else if (typeof popup === 'function') {
              popup = popup(popupProps);
            } else {
              popup = <PopupOverlay {...popupProps}>{popup}</PopupOverlay>; 
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
        const {popup, ...others} = this.props;
        return (
        <SemanticUI
           ref={dom=>this.dom=dom}
           onMouseEnter={this.mouseOver.bind(this)} 
           onMouseLeave={this.mouseOut.bind(this)} 
           style={{position:'relative'}}
           {...others}
        />
        );
    }
}

export default PopupHover;
