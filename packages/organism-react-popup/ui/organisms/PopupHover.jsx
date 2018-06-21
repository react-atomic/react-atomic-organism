import React, {PureComponent, cloneElement, createElement, isValidElement} from 'react'; 
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
    popup = null

    static defaultProps = {
      name: 'hover',
      component: SemanticUI
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

    update(props)
    {
      const {popup, name, toPool, alignParams} = props;
      this.popup = ( 
            <PopupFloatEl
                toPool={toPool}
                name={name}
                alignParams={alignParams}
                onMouseEnter={this.floatMouseOver} 
                onMouseLeave={this.floatMouseOut} 
            >
                {popup}
            </PopupFloatEl>
      ); 
    }

    componentDidMount()
    {
        this.update(this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        this.update(this.props)
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
        const {popup, isKeep, toPool, alignParams, component, ...others} = this.props;
        const build = (isValidElement(component)) ?
            cloneElement:
            createElement
            ;
	return build(
	    component,
	    {
		refCb: dom=>this.dom=dom,
		onMouseEnter: this.mouseOver,
		onMouseLeave: this.mouseOut,
		...others
	    }
	)
    }
}

export default PopupHover;
