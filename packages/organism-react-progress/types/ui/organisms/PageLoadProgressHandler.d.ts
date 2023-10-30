export default PageLoadProgressHandler;
export type StoreProps = {
    store: import("reshow-flux-base").StoreObject<any>;
};
export type PageLoadProgressProps = {
    name?: string;
    isFloat?: boolean;
    ajax?: boolean;
    delay?: number;
    zIndex?: number;
    barProps?: any;
    ref?: any;
    isRunningKey?: string;
};
/**
 * @type React.FC<PageLoadProgressProps&StoreProps>
 */
declare const PageLoadProgressHandler: React.FC<PageLoadProgressProps & StoreProps>;
import * as React from "react";
