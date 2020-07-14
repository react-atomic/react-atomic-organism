import React, { useEffect, useState } from "react";
import { mixClass, build, SemanticUI } from "react-atomic-molecule";
import callfunc from "call-func";

import DisplayPopupEl from "../organisms/DisplayPopupEl";
import PopupOverlay from "../molecules/PopupOverlay";

const PopupMonitor = ({
  component,
  children,
  className,
  getIsShow,
  popup,
  ...otherProps
}) => {
  const [show, setShow] = useState();
  const isShow = callfunc(getIsShow, [otherProps]);
  useEffect(() => {
    if (isShow) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isShow]);
  otherProps.className = mixClass(className, "popup-monitor");
  let popupEl = null;
  if (show) {
    popupEl = (
      <DisplayPopupEl key="popup-el">
        {build(popup, { wrap: PopupOverlay, doCallFunction: true })()}
      </DisplayPopupEl>
    );
  }
  const thisChildren = [children, popupEl];
  return build(component || SemanticUI)(otherProps, thisChildren);
};

export default PopupMonitor;
