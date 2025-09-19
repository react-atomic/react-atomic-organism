export default ChangeAnimation;
export type ChangeAnimationProps = {
    statusKey?: string;
    onEnd?: Function;
    animation?: string;
    children: any | string;
    otherProps?: any;
};
/**
 * @typedef {object} ChangeAnimationProps
 * @property {string} [statusKey]
 * @property {function} [onEnd]
 * @property {string} [animation]
 * @property {import('react').ReactElement|string} children
 * @property {Object} [otherProps]
 */
/**
 * @param {ChangeAnimationProps} param
 * @returns {import('react').ReactElement}
 */
declare function ChangeAnimation({ statusKey, onEnd, animation, children, ...otherProps }: ChangeAnimationProps): any;
