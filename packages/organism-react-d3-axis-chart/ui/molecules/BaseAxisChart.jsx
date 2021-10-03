import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import { build, SemanticUI } from "react-atomic-molecule";
import { mouse } from "getoffset";
import get from "get-object-value";
import { win } from "win-doc";
import callfunc from "call-func";

import Line from "../molecules/Line";
import Rect from "../molecules/Rect";
import Group from "../molecules/Group";
import XAxis from "../organisms/XAxis";
import YAxis from "../organisms/YAxis";
import Crosshair from "../organisms/Crosshair";

const adjustX = 60;
const adjustY = 20;

const useBaseAxisChart = (props) => {
  const [
    { isLoad, crosshairX, crosshairY, hideCrosshairX, hideCrosshairY, d3 },
    setState,
  ] = useState({});

  useEffect(() => {
    if (!win().__null) {
      import("d3-lib").then(
        ({ stack, curve, scaleLinear, scaleBand, hArea }) => {
          setState((prev) => ({
            ...prev,
            d3: {
              stack,
              curve,
              scaleLinear,
              scaleBand,
              hArea,
            },
            isLoad: true,
          }));
        }
      );
    }
  }, []);

  if (!isLoad) {
    return null;
  }

  const {
    extraViewBox = 100,
    valuesLocator = (d) => d.values,
    xValueLocator = (d) => d.x,
    yValueLocator = (d) => d.y,
    data = [],
    onMove,

    /*axis*/
    thresholds,
    hideAxis = false,
    xScale,
    yScaleMore,
    xAxisAttr,
    yAxisAttr,
    scaleW = 500,
    scaleH = 500,

    /*crosshair*/
    hideCrosshairX: propsHideCrosshairX,
    hideCrosshairY: propsHideCrosshairY,
    hideCrosshairXLabel,
    hideCrosshairYLabel,
  } = props;

  let finalExtraViewBox = extraViewBox;
  if (hideAxis) {
    finalExtraViewBox = adjustX;
  }

  const dataFirstRow = get(data, [0], {});

  let thisXScale;
  if (xScale) {
    thisXScale = xScale;
  } else {
    const xScaleData = get(xAxisAttr, ["data"], () =>
      valuesLocator(dataFirstRow)
    );
    if (!xScaleData?.map) {
      console.warn(["Assign wrong xScaleData", xScaleData]);
      return null;
    }
    thisXScale = d3.scaleBand(xScaleData, 0, scaleW, xValueLocator);
  }

  /**
   * Handle yscale
   */
  const yScaleData = get(yAxisAttr, ["data"], () =>
    valuesLocator(dataFirstRow).map((d) => yValueLocator(d))
  );
  if (!yScaleData) {
    return null;
  }
  const thisYScaleMore = [].concat(thresholds || [], yScaleMore || []);
  const yScale = d3.scaleLinear(
    yScaleData,
    scaleH,
    0,
    null,
    get(yAxisAttr, ["num"]),
    thisYScaleMore
  );

  const handler = {
    onMouseEnter: () => {
      const hideX = propsHideCrosshairX || false;
      const hideY = propsHideCrosshairY || false;
      setState((prev) => ({
        ...prev,
        hideCrosshairX: hideX,
        hideCrosshairY: hideY,
      }));
    },
    onMouseLeave: () => {
      const hideX = propsHideCrosshairX || true;
      const hideY = propsHideCrosshairY || true;
      setState((prev) => ({
        ...prev,
        hideCrosshairX: hideX,
        hideCrosshairY: hideY,
      }));
    },
    onMouseMove: (e) => {
      const point = mouse(e);
      e.point = point;
      callfunc(onMove, [e]);
      setState((prev) => ({
        ...prev,
        crosshairX: point[0],
        crosshairY: point[1],
      }));
    },
  };

  const expose = {
    d3,
    xScale: thisXScale,
    yScale,
  };

  return {
    hideCrosshairX,
    hideCrosshairY,
    hideCrosshairXLabel,
    hideCrosshairYLabel,
    finalExtraViewBox,
    handler,
    isLoad,
    scaleW,
    scaleH,
    expose,
    hideAxis,
    crosshairX,
    crosshairY,
  };
};

const BaseAxisChart = (props) => {
  const {
    finalExtraViewBox,
    isLoad,
    handler,
    scaleW,
    scaleH,
    expose,
    hideAxis,
    hideCrosshairX,
    hideCrosshairY,
    hideCrosshairXLabel,
    hideCrosshairYLabel,
    crosshairX,
    crosshairY,
  } = useBaseAxisChart(props) || {};
  if (!isLoad) {
    return null;
  }
  const {
    atom = "svg",
    width = "100%",
    preserveAspectRatio = "xMidYMid meet",
    style,

    children,
    multiChart,

    /*axis*/
    color,
    invertedColor,
    xAxisAttr,
    yAxisAttr,

  } = props;

  let xaxis;
  let yaxis;
  let thresholdLines;
  let thisCrosshair;

  if (!hideAxis) {
    xaxis = (
      <XAxis
        scale={expose.xScale}
        length={scaleW}
        height={scaleH}
        color={color}
        invertedColor={invertedColor}
        {...xAxisAttr}
        key="xaxis"
        crosshairValue={crosshairX}
        hideCrosshair={hideCrosshairY}
        hideCrosshairLabel={hideCrosshairXLabel}
      />
    );
    yaxis = (
      <YAxis
        scale={expose.yScale}
        length={scaleH}
        color={color}
        invertedColor={invertedColor}
        {...yAxisAttr}
        key="yaxis"
        crosshairValue={crosshairY}
        hideCrosshair={hideCrosshairX}
        hideCrosshairLabel={hideCrosshairYLabel}
      />
    );
  }

  const childArr = [
    build(children)({ key: "base-chart", ...expose }),
    xaxis,
    yaxis,
    thresholdLines,
    thisCrosshair,
    <Rect
      {...handler}
      key="container"
      x="0"
      y="0"
      width={scaleW}
      height={scaleH}
      style={{ pointerEvents: "all", fill: "none" }}
    />,
  ];
  if (multiChart) {
    return <Group {...props}>{childArr}</Group>;
  } else {
    return (
      <SemanticUI
        atom={atom}
        width={width}
        preserveAspectRatio={preserveAspectRatio}
        style={style}
        viewBox={`0 0 ${Math.round(scaleW + finalExtraViewBox)} ${Math.round(
          scaleH + finalExtraViewBox
        )}`}
      >
        <Group transform={`translate(${adjustX}, ${adjustY})`}>
          {childArr}
        </Group>
      </SemanticUI>
    );
  }
};

export default BaseAxisChart;
