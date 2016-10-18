import React, {Component} from 'react'; 
import { Container } from 'reshow';
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
        const key = props.name;
        let show; 
        if (key) {
            show = state.get('node').get(key);
        } else {
            show = state.get('show');
        }
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

const PopupOverlayContainer = Container.create(
    PopupOverlay,
    { withProps:true }
);

export {PopupOverlay};

export default PopupOverlayContainer;
