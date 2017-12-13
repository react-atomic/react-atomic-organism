import React, {cloneElement} from 'react'; 
import { connect } from 'reshow-flux';
import get from 'get-object-value';
import {
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';
import getStyle from 'get-style';

import BasePopup from '../molecules/BasePopup';
import {
    popupStore
} from '../../src/index';

class PopupOverlay extends BasePopup
{
    static getStores()
    {
        return [popupStore];
    }

   static calculateState(prevState, props)
   {
        const state = popupStore.getState();
        const key = get(props, ['name'], 'default'); 
        const show = state.get('shows').get(key);
        return {
            show 
        };
   }

    componentWillReceiveProps(newProps)
    {
        this.setState({show: newProps.show});
    }

    renderOverlay(props)
    {
        return <SemanticUI {...props} />;
    }

    resetStyle(key, thisStyle)
    {
        const value = get(this.state, [key], ()=>get(this.props, [key]));
        if ('undefined' !== typeof value) {
            thisStyle[key] = value+ 'px';
        }
    }

    render()
    {
        const {show: stateShow} = this.state;
        if (!stateShow) {
            return null;
        }
        const {targetEl, toPool, isFollowTransform, className, show, style, group, ...others} = this.props;

        /* <!-- Handle Style */
        const thisStyle = {...style};
        this.resetStyle('top', thisStyle);
        this.resetStyle('left', thisStyle);
        this.resetStyle('width', thisStyle);
        this.resetStyle('height', thisStyle);
        if (targetEl && isFollowTransform) {
            thisStyle.transform = getStyle(targetEl, 'transform');
        }
        others.style = thisStyle;
        /*  Handle Style --> */

        const refCb = get(this.state, ['refCb'], ()=>get(this.props, ['refCb']));
        if (refCb) {
            others.refCb = refCb;
        }
        others.className = mixClass(
            className,
            get(this, ['state', 'className']),
            'visible'
        );
        return this.renderOverlay(others);
    }
}

export {PopupOverlay};

export default connect(
    PopupOverlay,
    { withProps:true }
);
