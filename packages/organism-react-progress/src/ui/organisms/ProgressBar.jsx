//@ts-check

import { forwardRef, useImperativeHandle } from "react";
import { mergeDefaultValue, Progress } from "react-atomic-molecule";
import useProgress from "../../useProgress";

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
const ProgressBar = forwardRef((props, ref) => {
  const {
    style,
    percent: propsPercent,
    barProps,
    delay,
    ...otherProps
  } = props;
  const { expose, percent } = useProgress(delay, propsPercent);
  useImperativeHandle(ref, () => expose, []);

  return (
    <Progress
      {...otherProps}
      style={{ ...Styles.progress, ...style }}
      barProps={mergeDefaultValue(barProps, { style: Styles.bar })}
      data-percent={percent}
      percent={percent}
    />
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;

const Styles = {
  progress: {
    position: "relative",
    transition: ["opacity 500ms linear"],
  },
  bar: {
    transition: ["width 500ms ease"],
  },
};
