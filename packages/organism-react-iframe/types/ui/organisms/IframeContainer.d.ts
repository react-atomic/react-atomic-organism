export default IframeContainer;
export type IframeContainerExpose = {
    postHeight: Function;
    getEl: () => HTMLElement;
};
export type IframeContainerProps = {
    src?: string;
    messageKey?: string;
    loading?: "eager" | "lazy";
    allow?: string;
    onLoad?: Function;
    style?: React.CSSProperties;
    refCb?: any;
    component?: import("reshow-build").Component;
};
/**
 * @type React.ForwardRefExoticComponent<?, IframeContainerProps>
 */
declare const IframeContainer: React.ForwardRefExoticComponent<unknown, IframeContainerProps>;
