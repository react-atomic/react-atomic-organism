import React, {useEffect} from 'react';
import {popupDispatch} from '../../src/popupDispatcher';
import {mixClass, build} from 'react-atomic-molecule';
import callfunc from 'call-func';

const PopupMonitor = ({
  children,
  className,
  getPopupKey,
  PopupElement,
  ...otherProps
}) => {
  const popupKey = callfunc(getPopupKey, [otherProps]);
  useEffect(() => {
    const myPopupElement = build(PopupElement, [otherProps]);
    if (popupKey) {
      popupDispatch('dom/update', {
        popup: myPopupElement,
      });
    } else {
      popupDispatch('dom/closeAll', {
        popup: myPopupElement,
      });
    }
  }, [getPopupKey, PopupElement]);
  otherProps.className = mixClass(className, 'popup-monitor');
  if (popupKey) {
    delete otherProps[popupKey];
  }
  return build(children)(otherProps);
};

export default PopupMonitor;
