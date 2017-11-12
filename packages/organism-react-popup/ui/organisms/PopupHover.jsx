import React, {PureComponent, cloneElement} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';

import {
    popupDispatch,
    PopupFloatEl
} from '../../src/index';

let closeTimer = {};

class PopupHover extends PureComponent
{
   static defaultProps = {
        name: 'hover'
   };

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
        this.popup = cloneElement(
            this.popup,
            {
                targetEl: this.dom 
            }
        );
        popupDispatch({
            type: 'dom/update',
            params: {
                popup: this.popup 
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
                popup: this.popup
           }
        });
    }

   constructor(props)
   {
      super(props);
      const {popup, name} = props;
      this.popup = ( 
            <PopupFloatEl 
                name={name}
                onMouseEnter={this.floatMouseOver} 
                onMouseLeave={this.floatMouseOut} 
            >
                {popup}
            </PopupFloatEl>
      ); 
   } 


    componentWillUnmount()
    {
        popupDispatch({
           type: 'dom/cleanOne',
           params: {
                popup: this.popup
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
