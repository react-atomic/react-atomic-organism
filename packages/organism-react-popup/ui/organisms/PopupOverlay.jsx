import React, {cloneElement} from 'react'; 
import { connect } from 'reshow-flux';
import get from 'get-object-value';
import {
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

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

    render()
    {
        const {show: stateShow} = this.state;
        if (!stateShow) {
            return null;
        }
        const {targetEl, className, show, style, group, ...others} = this.props;
        const top = get(this.state, ['top'], ()=>get(this.props, ['top']));
        const left = get(this.state, ['left'], ()=>get(this.props, ['left']));
        const thisStyle = {...style};
        if (top) {
            thisStyle.top = top+ 'px';
        }
        if (left) {
            thisStyle.left = left+ 'px';
        }
        const refCb = get(this.state, ['refCb'], ()=>get(this.props, ['refCb']));
        if (refCb) {
            others.refCb = refCb;
        }
        others.className = mixClass(
            className,
            get(this, ['state', 'className']),
            'visible'
        );
        others.style = thisStyle;
        return this.renderOverlay(others);
    }
}

export {PopupOverlay};

export default connect(
    PopupOverlay,
    { withProps:true }
);
