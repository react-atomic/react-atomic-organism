export default ResponsiveVideo;
export type ResponsiveVideoProps = {
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    mask?: boolean | undefined;
    aspectRatio?: string | undefined;
    onClick?: Function | undefined;
    children?: React.ReactElement | null;
};
/**
 * @typedef {object} ResponsiveVideoProps
 * @property {string=} className
 * @property {React.CSSProperties=} style
 * @property {boolean=} mask
 * @property {string=} aspectRatio
 * @property {Function=} onClick
 * @property {React.ReactElement?} [children]
 */
/**
 * @param {ResponsiveVideoProps} props
 */
declare function ResponsiveVideo({ mask, aspectRatio, children, onClick, style, className, }: ResponsiveVideoProps): any;
