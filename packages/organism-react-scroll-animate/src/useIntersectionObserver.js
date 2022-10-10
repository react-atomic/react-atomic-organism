//@ts-check

import { useRef, useEffect } from "react";
import build from "reshow-build";
import { win } from "win-doc";

/**
 * @param {React.ReactElement|string} component
 * @param {IntersectionObserverCallback} onIntersect
 * @param {object} options
 * @returns {React.ReactElement}
 */
const useIntersectionObserver = (
  component,
  onIntersect,
  options = {}
) => {
  const lastEl = useRef();
  const el = build(component)({ ref: lastEl });
  useEffect(() => {
    const dom = lastEl.current;
    if (!dom) {
      return;
    }
    const observer = new (win().IntersectionObserver)(onIntersect, options);
    observer.observe(dom);
    return () => {
      observer.unobserve(dom);
    };
  }, [lastEl.current]);
  return el;
};

export default useIntersectionObserver;
