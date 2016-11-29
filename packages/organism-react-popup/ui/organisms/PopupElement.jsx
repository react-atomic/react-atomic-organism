import React, {Component} from 'react'; 
import { Container } from 'reduce-flux';
import { SemanticUI } from 'react-atomic-molecule'; 
import get from 'get-object-value';

import {
    popupStore
} from '../../src/index';

let elements = {};
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
        const popup = state.get('popup');
        const key = get(popup, ['props', 'name'], 'default'); 
        elements[key] = React.cloneElement(
            popup,
            {key: key}
        );
        const allKeys = keys(elements);
        let pops=[];
        allKeys.forEach((k)=>{
            pops.push(elements[k]); 
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
