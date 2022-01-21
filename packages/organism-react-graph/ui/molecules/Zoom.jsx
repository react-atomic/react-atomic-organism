import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import { useD3 } from "d3-lib";
import callfunc from "call-func";

import Group from "../molecules/Group";

const useZoom = (props) => {
  const { onGetEl, onZoom, onD3Load, scaleExtent = [-1, 8], ...others } = props;
  const [isLoad, d3] = useD3(onD3Load);
  const [transform, setTransform] = useState(null);
  const lastEvent = useRef();
  const lastTransform = useRef();
  const lastD3ZoomObject = useRef();
  const lastEnable = useRef();
  useEffect(() => {
    lastTransform.current = transform;
    lastEvent.current && callfunc(onZoom, [lastEvent.current]);
  }, [transform]);

  useEffect(() => {
    if (isLoad) {
      expose.enable();
    }
  }, [isLoad]);

  const expose = {
    getTransform: () => lastTransform.current,
    setTransform: (transform) => handleTransform(transform),
    getXYK,
    setXYK: ({ x, y, k }) => {
      const { x: x1, y: y1, k: k1 } = getXYK();
      x = x ?? x1 ?? 0;
      y = y ?? y1 ?? 0;
      k = k ?? k1 ?? 1;
      return handleTransform(d3.toZoomTransform({ x, y, k }));
    },
    getD3Zoom: () => lastD3ZoomObject.current,
    enable: () => {
      if (!lastEnable.current) {
        const el = callfunc(onGetEl);
        lastD3ZoomObject.current = d3.d3Zoom({
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
        lastD3ZoomObject.current = d3.d3Zoom({
          el,
          scaleExtent,
          callback: null,
        });
      }
      lastEnable.current = false;
    },
    getEnabled: () => lastEnable.current,
  };

  if (!isLoad) {
    return { isLoad, expose };
  }


  const getXYK = () => {
    const { x, y, k } = lastTransform.current || {};
    return { x, y, k };
  };

  const handleTransform = (transformVal, e) => {
    if (!e) {
      e = { transform: transformVal };
      const objD3Zoom = lastD3ZoomObject.current;
      const el = d3.d3Select(callfunc(onGetEl));
      if (objD3Zoom && el) {
        objD3Zoom.transform(el, transformVal);
      }
    }
    e.zoom = expose;
    lastEvent.current = e;
    setTransform(transformVal);
  };

  return {
    isLoad,
    expose,
    others,
    transform: transform ? transform + "" : transform,
  };
};

const Zoom = forwardRef((props, ref) => {
  const { isLoad, expose, others, transform } = useZoom(props);

  useImperativeHandle(ref, () => expose, []);

  if (!isLoad) {
    return null;
  }

  return <Group name="zoom" {...others} transform={transform} />;
});

Zoom.displayName = "Zoom";

export default Zoom;
