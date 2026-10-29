import React from "react";
export type ScrollAnimateProps = {
    monitorScroll?: boolean;
    /**
     * use your own container
     */
    container?: import("reshow-build").Component;
    appear?: any | undefined;
    enter?: any | undefined;
    leave?: any | undefined;
};
/**
 * @typedef {object} ScrollAnimateProps
 * @property {boolean} [monitorScroll=false]
 * @property {import("reshow-build").Component} [container=null] use your own container
 * @property {any=} appear
 * @property {any=} enter
 * @property {any=} leave
 */
/**
 * @param {ScrollAnimateProps & Record<any,any>} inputProps
 */
declare const ScrollAnimate: ({ monitorScroll, container, ...props }: ScrollAnimateProps & Record<any, any>) => React.JSX.Element;
export default ScrollAnimate;
