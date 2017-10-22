import React, {Component} from 'react'; 
import getOffset from 'getoffset';
import {alignUI, getPositionString} from 'get-window-offset';
import {
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

import {
    popupDispatch,
    PopupFloatEl
} from '../../src/index';

class PopupHover extends Component
{
   constructor(props)
   {
      super(props);
      const {popup} = this.props;
      this.state = {
         popup: ( 
            <PopupFloatEl 
                refCb={dom=>this.handleMoveTo(dom)}
                onMouseEnter={this.floatMouseOver} 
                onMouseLeave={this.floatMouseOut} 
            >
                {popup}
            </PopupFloatEl>
         ) 
      };
   } 

   handleMoveTo = (el) =>
   {
        if (!el) {
            return;
        }
        const info = alignUI(this.dom, el);
        const {move, loc} = info;
        el.style.left=move[0]+'px';
        el.style.top=move[1]+'px';
        const positionStr = getPositionString(loc);
        el.className += ' '+positionStr;
   }

    floatMouseOver = ()=>
    {
        this.isKeep = true;
    }

    floatMouseOut = ()=>
    {
        this.isKeep = false;
        this.close(); 
    }

    mouseOver = ()=>
    {
        const {popup} = this.state;
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: popup
            }
        });
    }

    mouseOut = ()=>
    {
        setTimeout(()=>{
            this.close(); 
        }, 100);
    }

    close = () =>
    {
        const {isKeep} = this.props;
        if (this.isKeep || isKeep) {
            return;
        }
        const {popup} = this.state;
        popupDispatch({
           type: 'dom/closeOne',
           params: {
                popup: popup
           }
        });
    }

    render()
    {
        const {popup, isKeep, ...others} = this.props;
        return (
            <SemanticUI
               refCb={dom=>this.dom=dom}
               onMouseEnter={this.mouseOver} 
               onMouseLeave={this.mouseOut} 
               style={{position:'relative'}}
               {...others}
            />
        );
    }
}

export default PopupHover;
