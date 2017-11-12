import React, {Component} from 'react'; 
import { connect } from 'reshow-flux';
import get from 'get-object-value';
import {
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';

import {
    popupStore
} from '../../src/index';

class PopupOverlay extends Component
{
    static getStores()
    {
        return [popupStore];
    }

   static calculateState(prevState, props)
   {
        const state = popupStore.getState();
        const key = get(props, ['name'], 'default'); 
        let show = state.get('node').get(key);
        return {
            show: show 
        }
   }

    componentWillReceiveProps(newProps)
    {
        this.setState({show: newProps.show});
    }

    render()
    {
        
        const {top, left, refCb, show: stateShow} = this.state;
        if (!stateShow) {
            return null;
        }
        const {targetEl, className, show, style, ...others} = this.props;
        const thisStyle = {
            ...style,
            top,
            left
        };
        if (refCb) {
            others.refCb = refCb;
        }
        return (
            <SemanticUI
                {...others} 
                className={mixClass(
                    className,
                    get(this, ['state', 'className']),
                    'popup visible')
                }
                style={thisStyle}
            />
        );
    }
}

export {PopupOverlay};

export default connect(
    PopupOverlay,
    { withProps:true }
);
