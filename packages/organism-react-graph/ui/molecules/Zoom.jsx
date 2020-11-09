import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import { d3Select, d3Zoom, toZoomTransform } from "d3-lib";
import callfunc from "call-func";

import Group from "../molecules/Group";

const Zoom = forwardRef((props, ref) => {
  const { onGetEl, onZoom, scaleExtent, ...others } = props;
  const [transform, setTransform] = useState(null);
  const lastEvent = useRef();
  const lastTransform = useRef();
  const lastD3ZoomObject = useRef();
  const lastEnable = useRef();
  const getXYK = () => {
    const { x, y, k } = lastTransform.current || {};
    return { x, y, k };
  };
  const expose = {
    getTransform: () => lastTransform.current,
    setTransform: (transform) => handleTransform(transform),
    getXYK,
    setXYK: ({ x, y, k }) => {
      const { x: x1, y: y1, k: k1 } = getXYK();
      x = x ?? x1 ?? 0;
      y = y ?? y1 ?? 0;
      k = k ?? k1 ?? 1;
      return handleTransform(toZoomTransform({ x, y, k }));
    },
    getD3Zoom: () => lastD3ZoomObject.current,
    enable: () => {
      if (!lastEnable.current) {
        const el = callfunc(onGetEl);
        lastD3ZoomObject.current = d3Zoom({
          el,
          scaleExtent,
          callback: (e) => handleTransform(e.transform, e),
        });
      }
      lastEnable.current = true;
    },
    disable: () => {
      if (lastEnable.current) {
        const el = callfunc(onGetEl);
        lastD3ZoomObject.current = d3Zoom({
          el,
          scaleExtent,
          callback: null,
        });
      }
      lastEnable.current = false;
    },
    getEnabled: () => lastEnable.current,
  };
  const handleTransform = (transformVal, e) => {
    if (!e) {
      e = { transform: transformVal };
      const objD3Zoom = lastD3ZoomObject.current;
      const el = d3Select(callfunc(onGetEl));
      if (objD3Zoom && el) {
        objD3Zoom.transform(el, transformVal);
      }
    }
    e.zoom = expose;
    lastEvent.current = e;
    setTransform(transformVal);
  };
  useImperativeHandle(ref, () => expose);
  useEffect(() => {
    lastTransform.current = transform;
    lastEvent.current && callfunc(onZoom, [lastEvent.current]);
  }, [transform]);
  useEffect(() => {
    expose.enable();
  }, []);
  return (
    <Group name="zoom" {...others} transform={transform && transform + ""} />
  );
});

Zoom.defaultProps = {
  scaleExtent: [-1, 8],
};

Zoom.displayName = "Zoom";

export default Zoom;
