import React, {Component, cloneElement} from 'react'; 
import { connect } from 'reshow-flux';
import { SemanticUI } from 'react-atomic-molecule'; 
import get from 'get-object-value';

import { popupStore } from '../../src/index';

const keys = Object.keys;

class PopupPool extends Component
{
    static getStores()
    {
        return [popupStore];
    }

    static calculateState(prevState, props)
    {
        const state = popupStore.getState();
        const nodes = state.get('nodes').toJS();
        const {name} = props;
        const pops = [];
        keys(nodes).forEach( key => {
            let node = nodes[key];
            const toPool = get(node, ['props', 'toPool']); 
            if ((name || toPool) && toPool !== name) {
                return;
            }

            node = cloneElement (
                node,
                {key} 
            );
            pops.push(node); 
        });
        return { pops };
    }

    render()
    {
        const {pops} = this.state;
        if (pops.length) {
            return <SemanticUI className="popup-pool" ui={false} {...this.props}>{pops}</SemanticUI>;
        } else {
            return null;
        }
    }
}
export default connect(PopupPool, {withProps: true});
