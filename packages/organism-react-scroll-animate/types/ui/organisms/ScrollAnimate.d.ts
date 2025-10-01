export default ScrollAnimate;
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
declare function ScrollAnimate({ monitorScroll, container, ...props }: ScrollAnimateProps & Record<any, any>): any;
