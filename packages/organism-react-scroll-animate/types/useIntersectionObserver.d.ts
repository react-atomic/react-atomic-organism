import React from "react";
/**
 * @param {React.ReactElement|string} component
 * @param {IntersectionObserverCallback} onIntersect
 * @param {object} options
 * @returns {React.ReactElement}
 */
declare const useIntersectionObserver: (component: React.ReactElement | string, onIntersect: IntersectionObserverCallback, options?: object) => React.ReactElement;
export default useIntersectionObserver;
