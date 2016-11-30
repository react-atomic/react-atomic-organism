import React, {Component} from 'react'; 
import { Container } from 'reduce-flux';
import { SemanticUI } from 'react-atomic-molecule'; 
import {
    popupStore
} from '../../src/index';

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
        const allKeys = keys(nodes);
        let pops=[];
        allKeys.forEach((k)=>{
            nodes[k] = React.cloneElement(
                nodes[k],
                {key: k}
            );
            pops.push(nodes[k]); 
        });
        return {
            pops: pops
        }
   }

   render() {
       const state = this.state;
       if (state.pops) {
           return <SemanticUI className="popup" ui={false}>{state.pops}</SemanticUI>;
       } else {
           return null;
       }
   }
}
export default Container.create(PopupElement);
