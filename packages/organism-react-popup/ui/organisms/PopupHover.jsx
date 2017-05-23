import React, {Component} from 'react'; 
import getOffset from 'getoffset';
import {
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
        let bodyWidth = document.body.clientWidth;
        let domOffset = getOffset(this.dom);
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
           type: 'dom/closeAll'
        });
    }

    render()
    {
        const {popup, ...others} = this.props;
        return (
        <SemanticUI
           refCb={dom=>this.dom=dom}
           onMouseEnter={this.mouseOver.bind(this)} 
           onMouseLeave={this.mouseOut.bind(this)} 
           style={{position:'relative'}}
           {...others}
        />
        );
    }
}

export default PopupHover;
