import { useState, useRef, useEffect } from "react";
import { useReduceStore, Map } from "reshow-flux";

import { build } from "react-atomic-molecule";
import { mouse } from "getoffset";
import get from "get-object-value";
import { win } from "win-doc";
import callfunc from "call-func";
import { useD3 } from "d3-lib";

import Line from "../molecules/Line";
import Rect from "../molecules/Rect";
import Group from "../molecules/Group";
import ChartElement from "../molecules/ChartElement";
import XAxis from "../organisms/XAxis";
import YAxis from "../organisms/YAxis";
import Crosshair from "../organisms/Crosshair";
import resetProps from "../../src/resetProps";

const adjustX = 60;
const adjustY = 20;

const useBaseAxisChart = (props) => {
  const [isLoad, d3] = useD3();
  const subReducer = useReduceStore(null, () => Map({ hideCrosshairX: true }));

  const {
    valuesLocator,
    xValueLocator,
    yValueLocator,
    attrsLocator,
    allDataLocator,
    mainChartDataLocator,
    data,
    onMove,

    /*axis*/
    thresholds,
    xScale,
    yScaleMore,
    xAxisAttr,
    yAxisAttr,
    scaleW,
    scaleH,

    /*crosshair*/
    crosshair,
    crosshairX: propscCosshairX,
    hideCrosshairX: propsHideCrosshairX,
    hideCrosshairY: propsHideCrosshairY,
    hideCrosshairXLabel,
    hideCrosshairYLabel,
    children,
    multiChart,
    reducer,

    /*layout*/
    hideAxis,
    color,
    invertedColor,
    transform,
    style,
  } = resetProps(props);

  useEffect(() => {
    reducer[1]({
      crosshairX: propscCosshairX,
      hideCrosshairY: propsHideCrosshairY,
    });
  }, [propscCosshairX, propsHideCrosshairY]);

  if (!isLoad) {
    return null;
  }

  const mainDataValues = valuesLocator(mainChartDataLocator(data));

  if (!mainDataValues || !mainDataValues.map) {
    return null;
  }

  let thisXScale;
  if (xScale) {
    thisXScale = xScale;
  } else {
    const xScaleData = get(xAxisAttr, ["data"], () => mainDataValues);

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
    mainDataValues.map((d) => yValueLocator(d))
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
      subReducer[1]({
        hideCrosshairX: hideX,
      });
      reducer[1]({
        hideCrosshairY: hideY,
      });
    },
    onMouseLeave: () => {
      const hideX = propsHideCrosshairX || true;
      const hideY = propsHideCrosshairY || true;
      setTimeout(() =>
        subReducer[1]({
          hideCrosshairX: hideX,
        })
      );
      reducer[1]({
        hideCrosshairY: hideY,
      });
    },
    onMouseMove: (e) => {
      const point = mouse(e);
      e.point = point;
      callfunc(onMove, [e]);
      const nextState = {
        crosshairY: point[1],
      };
      if (null == propscCosshairX) {
        nextState.hideCrosshairY = false;
        nextState.crosshairX = point[0];
      }
      subReducer[1]({
        hideCrosshairX: false,
      });
      reducer[1](nextState);
    },
  };

  const expose = {
    xValueLocator,
    yValueLocator,
    valuesLocator,
    attrsLocator,
    allDataLocator,
    d3,
    xScale: thisXScale,
    yScale,
    scaleH,
  };

  return {
    hideCrosshairXLabel,
    hideCrosshairYLabel,
    crosshair,
    subReducer,
    reducer,

    handler: crosshair ? handler : null,
    isLoad,
    scaleW,
    scaleH,
    expose,
    xAxisAttr,
    yAxisAttr,
    thresholds,
    children,
    multiChart,

    /*layout*/
    hideAxis,
    color,
    invertedColor,
    transform,
    style,
  };
};

const BaseAxisChart = (props) => {
  const state = useBaseAxisChart(props) || {};
  const {
    hideCrosshairXLabel,
    hideCrosshairYLabel,
    crosshair,
    subReducer,
    reducer,

    isLoad,
    handler,
    scaleW,
    scaleH,
    expose,
    xAxisAttr,
    yAxisAttr,
    thresholds,
    children,
    multiChart,

    /*layout*/
    hideAxis,
    color,
    invertedColor,
    transform,
  } = state;

  if (!isLoad) {
    return null;
  }

  let xaxis;
  let yaxis;
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
        reducer={reducer}
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
        reducer={reducer}
        subReducer={subReducer}
        hideCrosshairLabel={hideCrosshairYLabel}
      />
    );
  }

  const thresholdLines = [];
  if (thresholds) {
    thresholds.forEach((threshold, key) => {
      if (isNaN(threshold)) {
        return;
      }
      const yThreshold = expose.yScale.scaler(threshold);
      thresholdLines.push(
        <Line
          start={{ x: 0, y: yThreshold }}
          end={{ x: scaleW, y: yThreshold }}
          stroke="#f00"
          strokeWidth="2"
          strokeDasharray="5,5"
          key={"threshold" + key}
          style={{ opacity: ".5" }}
        />
      );
    });
  }

  let thisCrosshair;
  if (crosshair) {
    thisCrosshair = (
      <Crosshair
        key="crosshair"
        scaleW={scaleW}
        scaleH={scaleH}
        xScale={expose.xScale}
        yScale={expose.yScale}
        subReducer={subReducer}
        reducer={reducer}
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
    return <Group transform={transform}>{childArr}</Group>;
  } else {
    return (
      <ChartElement {...state}>
        <Group transform={`translate(${adjustX}, ${adjustY})`}>
          {childArr}
        </Group>
      </ChartElement>
    );
  }
};

export default BaseAxisChart;
