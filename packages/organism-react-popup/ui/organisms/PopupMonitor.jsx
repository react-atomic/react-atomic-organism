import React, {Component} from 'react'; 

import {
    popupDispatch
} from '../../src/index';

class PopupMonitor extends Component
{
   static calculateState(prevState, props)
   {
        const key = this.popupKey;
        if (key) {
            const popupElement = this.getPopupElement(key);
            popupDispatch({
                type: 'dom/update',
                params: {
                    popup: popupElement
                }
            });
        } else {
            popupDispatch({
                type: 'dom/closeAll'
            });
        }
        return prevState;
   }
}

export default PopupMonitor;
