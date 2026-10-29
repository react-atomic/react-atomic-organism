import React from "react";
export type IframeContainerExpose = {
    postHeight: Function;
    getEl: () => HTMLIFrameElement;
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
 * @type React.ForwardRefExoticComponent<any, IframeContainerProps>
 */
declare const IframeContainer: React.ForwardRefExoticComponent<any, IframeContainerProps>;
export default IframeContainer;
