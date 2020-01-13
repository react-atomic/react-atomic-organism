import React, {Component} from 'react'; 
import { connect } from 'reshow-flux';
import { build, SemanticUI } from 'react-atomic-molecule'; 
import get from 'get-object-value';

import popupStore from '../../src/stores/popupStore';

const keys = Object.keys;

class PopupPool extends Component
{
    static defaultProps = {
      component: SemanticUI
    }

    static getStores()
    {
        return [popupStore];
    }

    static calculateState(prevState, props)
    {
        const nodes = popupStore.getMap('nodes');
        const {name} = props;
        const pops = [];
        keys(nodes).forEach( key => {
            let node = nodes[key];
            const nodeProps = get(node, ['props'], {}); 
            const toPool = nodeProps.toPool; 
            if ((name || toPool) && toPool !== name) {
                return;
            }

            node = build( node) ( {key} );
            pops.push(node); 
        });
        return { pops };
    }

    render()
    {
        const {pops} = this.state;
        if (pops.length) {
            const {component, ...otherProps} = this.props;
            return build(component)({
              className: 'popup-pool',
              ui: false,
              ...otherProps
            }, pops);
        } else {
            return null;
        }
    }
}
export default connect(PopupPool, {withProps: true});
