import React, {Component} from 'react'; 
import { Container } from 'flux/utils';

import {
    popupStore
} from '../../src/index';

class PopupElement extends Component
{
    static getStores()
    {
        return [popupStore];
    }

   static calculateState(prevState)
   {
        const state = popupStore.getState();
        return {
            popup: state.get('popup')
        }
   }

   render() {
       let state = this.state;
       if (state.popup) {
           return state.popup;
       } else {
           return null;
       }
   }
}
const PopupElementContainer = Container.create(PopupElement);
export default PopupElementContainer;
