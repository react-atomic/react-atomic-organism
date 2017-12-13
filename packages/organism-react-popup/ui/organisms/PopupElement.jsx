import React, {Component, cloneElement} from 'react'; 
import { connect } from 'reshow-flux';
import { SemanticUI } from 'react-atomic-molecule'; 
import { popupStore } from '../../src/index';

const keys = Object.keys;

class PopupElement extends Component
{
    static getStores()
    {
        return [popupStore];
    }

    static calculateState(prevState)
    {
        const state = popupStore.getState();
        const nodes = state.get('nodes').toJS();
        const pops = [];
        keys(nodes).forEach( k => {
            nodes[k] = cloneElement (
                nodes[k],
                {key: k} 
            );
            pops.push(nodes[k]); 
        });
        return { pops };
    }

    render()
    {
        const {pops} = this.state;
        if (pops.length) {
            return <SemanticUI className="popup" ui={false} {...this.props}>{pops}</SemanticUI>;
        } else {
            return null;
        }
    }
}
export default connect(PopupElement);
