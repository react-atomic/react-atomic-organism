export default ResponsiveVideo;
export type ResponsiveVideoProps = {
    mask?: boolean | undefined;
    showControllBar?: boolean | undefined;
    corp?: number | undefined;
    restart?: Function | undefined;
    children?: React.ReactElement | null;
};
/**
 * @typedef {object} ResponsiveVideoProps
 * @property {boolean=} mask
 * @property {boolean=} showControllBar
 * @property {number=} corp
 * @property {Function=} restart
 * @property {React.ReactElement?} [children]
 */
/**
 * @param {ResponsiveVideoProps} props
 */
declare function ResponsiveVideo({ mask, showControllBar, corp, children, restart, }: ResponsiveVideoProps): import("react/jsx-runtime").JSX.Element;
import * as React from "react";
