import React, { useEffect, useRef } from "react";
import { useMounted } from "reshow-hooks";
import { popupDispatch } from "../../src/stores/popupStore";

const DisplayPopupEl = (props) => {
  const _mounted = useMounted();
  const popup = useRef();
  useEffect(() => {
    return () => {
      if (popup.current) {
        popupDispatch({
          type: "dom/cleanOne",
          params: {
            popup: popup.current,
          },
        });
      }
    };
  }, []);
  useEffect(() => {
    popup.current = props.children;
    if (_mounted()) {
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
