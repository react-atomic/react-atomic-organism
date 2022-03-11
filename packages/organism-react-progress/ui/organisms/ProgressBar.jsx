import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { mergeDefaultValue, Progress } from "react-atomic-molecule";
import useProgress from "../../src/useProgress";

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
