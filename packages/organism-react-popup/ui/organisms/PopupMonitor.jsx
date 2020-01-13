import React, {useEffect} from 'react';
import {popupDispatch} from '../../src/popupDispatcher';
import {mixClass, build} from 'react-atomic-molecule';
import callfunc from 'call-func';

const PopupMonitor = ({children, className, getPopupRefStore, getPopupKey, getPopupElement, ...otherProps}) => {
  useEffect(()=>{
    const popupKey = callfunc(getPopupKey); 
    if (popupKey) {
      const popupElement = callfunc(getPopupElement);
      popupDispatch({
        type: 'dom/update',
        params: {
          popup: popupElement,
        },
      });
    } else {
      popupDispatch({
        type: 'dom/closeAll',
      });
    }
  });
  otherProps.className = mixClass(className, 'popup-monitor');
  return build(children)(otherProps);
}

export default PopupMonitor;
