export default ResponsiveVideo;
export type ResponsiveVideoProps = {
    mask?: boolean | undefined;
    aspectRatio?: string | undefined;
    onClick?: Function | undefined;
    children?: React.ReactElement | null;
};
/**
 * @typedef {object} ResponsiveVideoProps
 * @property {boolean=} mask
 * @property {string=} aspectRatio
 * @property {Function=} onClick
 * @property {React.ReactElement?} [children]
 */
/**
 * @param {ResponsiveVideoProps} props
 */
declare function ResponsiveVideo({ mask, aspectRatio, children, onClick, }: ResponsiveVideoProps): import("react/jsx-runtime").JSX.Element;
import * as React from "react";
