import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Progress } from "react-atomic-molecule";
import useProgress from "../../src/useProgress";

const ProgressBar = forwardRef((props, ref) => {
  const { delay, percent: propsPercent, ...otherProps } = props;
  const { expose, percent } = useProgress(props, propsPercent);
  useImperativeHandle(ref, () => expose);

  return (
    <Progress
      {...otherProps}
      style={Styles.progress}
      barProps={{
        style: Styles.bar,
      }}
      percent={percent}
    />
  );
});

ProgressBar.defaultProps = {
  delay: 200,
};

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
