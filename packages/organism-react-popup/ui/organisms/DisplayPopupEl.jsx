import React, { useEffect, useRef } from "react";
import { popupDispatch } from "../../src/stores/popupStore";

const DisplayPopupEl = (props) => {
  const _mount = useRef(false);
  const popup = useRef(props.children);
  useEffect(() => {
    _mount.current = true;
    return () => {
      _mount.current = false;
      popupDispatch({
        type: "dom/cleanOne",
        params: {
          popup: popup.current,
        },
      });
    };
  }, []);
  useEffect(() => {
    popup.current = props.children;
    if (_mount.current) {
      popupDispatch({
        type: "dom/update",
        params: {
          popup: popup.current,
        },
      });
    }
  }, [props.children]);
  return null;
};

export default DisplayPopupEl;
