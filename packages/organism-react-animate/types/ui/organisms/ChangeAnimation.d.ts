export default ChangeAnimation;
export type ChangeAnimationProps = {
    statusKey?: string;
    onEnd?: Function;
    animation?: string;
    children: React.ReactElement | string;
    otherProps?: any;
};
/**
 * @typedef {object} ChangeAnimationProps
 * @property {string} [statusKey]
 * @property {function} [onEnd]
 * @property {string} [animation]
 * @property {React.ReactElement|string} children
 * @property {Object} [otherProps]
 */
/**
 * @param {ChangeAnimationProps} param
 * @returns {React.ReactElement}
 */
declare function ChangeAnimation({ statusKey, onEnd, animation, children, ...otherProps }: ChangeAnimationProps): React.ReactElement;
