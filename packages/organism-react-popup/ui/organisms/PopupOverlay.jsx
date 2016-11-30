import React, {Component} from 'react'; 
import { Container } from 'reduce-flux';
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
    static defaultProps = { show: 1 }

    static getStores()
    {
        return [popupStore];
    }

   static calculateState(prevState,props)
   {
        const state = popupStore.getState();
        const key = get(props, ['name'], 'default'); 
        let show = state.get('node').get(key);
        return {
            show: show 
        }
   }

    constructor(props) 
    {
        super(props);
        this.state = {
             show: props.show
        };
    }

    componentWillReceiveProps(newProps)
    {
        this.setState({show: newProps.show});
    }

    render()
    {
        if (!this.state.show) {
            return null;
        }
        const classes = mixClass (
            this.props.className,
            'popup'
        );
        return (
            <SemanticUI {...this.props} className={classes}>
            {this.props.children}
            </SemanticUI>
        );
    }
}

export {PopupOverlay};

export default Container.create(
    PopupOverlay,
    { withProps:true }
);
