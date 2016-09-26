import React, {Component} from 'react'; 
import { Container } from 'flux/utils';

import {
    popupStore,
    popupDispatch
} from '../../src/index';

class PopupDom extends Component
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
const PopupDomContainer = Container.create(PopupDom);
export default PopupDomContainer;
