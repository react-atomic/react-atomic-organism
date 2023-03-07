export default ProgressBar;
export type ProgressBarProps = {
    style?: object;
    percent?: number;
    barProps?: object;
    delay?: number;
};
/**
 * @typedef {object} ProgressBarProps
 * @property {object} [style]
 * @property {number} [percent]
 * @property {object} [barProps]
 * @property {number} [delay]
 */
/**
 * @type React.FC<ProgressBarProps>
 * @returns {React.ReactElement}
 */
declare const ProgressBar: React.FC<ProgressBarProps>;
