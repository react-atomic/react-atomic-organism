export default IframeContainer;
export type IframeContainerProps = {
    src?: string;
    messageKey?: string;
    loading?: string;
    allow?: string;
    onLoad?: Function;
    style?: React.CSSProperties;
    ref?: any;
    refCb?: any;
    component?: import("reshow-build").Component;
};
/**
 * @type React.FC<IframeContainerProps>
 */
declare const IframeContainer: React.FC<IframeContainerProps>;
