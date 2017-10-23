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

let closeTimer = {};

class PopupHover extends Component
{
   static defaultProps = {
        name: 'hover'
   };

   constructor(props)
   {
      super(props);
      const {popup, name} = props;
      this.state = {
         popup: ( 
            <PopupFloatEl 
                name={name}
                refCb={this.setFloatEl}
                ref={this.handleMoveTo}
                onMouseEnter={this.floatMouseOver} 
                onMouseLeave={this.floatMouseOut} 
            >
                {popup}
            </PopupFloatEl>
         ) 
      };
   } 

   setFloatEl = (el) =>
   {
        if (el) {
            this.floatEl = el;
        }
        return this.calPos();
   }

   calPos = () =>
   {
        if (!this.floatEl) {
            return;
        }
        const info = alignUI(this.dom, this.floatEl);
        if (!info) {
            console.error('can not get alignUI info');
            return;
        }
        const {move, loc} = info;
        this.floatLeft=move[0];
        this.floatTop=move[1];
        this.floatClassName = getPositionString(loc);
        const result = [
            this.floatTop,
            this.floatLeft,
            this.floatClassName
        ];
        return result;
   }

   handleMoveTo = (el) =>
   {
        if (!el) {
            return;
        }
        el.update(this.floatTop, this.floatLeft, this.floatClassName);
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
        const {name} = this.props;
        clearTimeout(closeTimer[name]);
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: this.state.popup 
            }
        });
    }

    mouseOut = ()=>
    {
        const {name} = this.props;
        clearTimeout(closeTimer[name]);
        closeTimer[name] = setTimeout(()=>{
            this.close(); 
        }, 100);
    }

    close = () =>
    {
        const {isKeep} = this.props;
        if (this.isKeep || isKeep) {
            return;
        }
        popupDispatch({
           type: 'dom/closeOne',
           params: {
                popup: this.state.popup
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
