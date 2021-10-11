import React from "react";
import { SemanticUI } from "react-atomic-molecule";

const adjustX = 60;

const ChartElement = (props) => {
  const {
    atom = "svg",
    width = "100%",
    preserveAspectRatio = "xMidYMid meet",
    extraViewBox = 100,
    className,
    scaleW,
    scaleH,
    hideAxis,
    style,
    refCb,
    onMouseEnter,
    onMouseLeave,
    children,
  } = props;

  const finalExtraViewBox = hideAxis ? adjustX : extraViewBox;

  return (
    <SemanticUI
      className={className}
      atom={atom}
      width={width}
      preserveAspectRatio={preserveAspectRatio}
      style={{ ...style, pointerEvents: "bounding-box" }}
      viewBox={`0 0 ${Math.round(scaleW + finalExtraViewBox)} ${Math.round(
        scaleH + finalExtraViewBox
      )}`}
      refCb={refCb}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </SemanticUI>
  );
};

export default ChartElement;
