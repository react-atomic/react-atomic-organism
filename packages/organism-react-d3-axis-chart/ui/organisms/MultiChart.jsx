import React, { useState, useRef, useEffect, Children } from "react";
import { build } from "react-atomic-molecule";
import get from "get-object-value";
import getoffset from "getoffset";
import { win } from "win-doc";
import { debounce } from "call-func";
import { useMounted } from "reshow-hooks";

import ChartElement from "../molecules/ChartElement";
import resetProps from "../../src/resetProps";

const adjustX = 60;

const getParentWH = (el) => {
  const parentEl = el.parentNode;
  return getoffset(parentEl);
};

const useMultiChart = (props) => {
  const [
    {
      isLoad,
      crosshairX,
      hideCrosshairY,
      d3,
      scaleW: stateScaleW,
      scaleH: stateScaleH,
    },
    setState,
  ] = useState({});

  const isMounted = useMounted();

  const {
    data,
    subChartScaleH,
    autoScale,
    scaleW: propsScaleW,
    scaleH: propsScaleH,
    xValueLocator,
    valuesLocator,
    mainChartDataLocator,
    children,
    crosshair,
    xAxisAttr,
  } = resetProps(props);

  const lastEl = useRef();

  useEffect(() => {
    const execResize = debounce(() => {
      const { w, h } = getParentWH(lastEl.current);
      setState((prev) => ({
        ...prev,
        scaleW: w,
        scaleH: h,
      }));
    });

    if (!win().__null) {
      import("d3-lib").then(({ scaleBand }) => {
        isMounted() && setState((prev) => ({
          ...prev,
          d3: {
            scaleBand,
          },
          isLoad: true,
        }));
        if (autoScale) {
          win().addEventListener("resize", execResize);
          execResize();
        }
      });
    }
    return () => {
      if (autoScale) {
        win().removeEventListener("resize", execResize);
      }
    };
  }, []);

  if (!isLoad) {
    return null;
  }

  const mainDataValues = valuesLocator(mainChartDataLocator(data));

  let thisScaleW = propsScaleW;
  let thisScaleH = propsScaleH;
  if (autoScale) {
    if (stateScaleW && stateScaleH) {
      thisScaleW = stateScaleW;
      thisScaleH = stateScaleH;
    }
  }

  const xAxisData = get(xAxisAttr, ["data"], () => mainDataValues || []);

  let thisXScale;
  if (xAxisData) {
    if (xAxisData.map) {
      thisXScale = d3.scaleBand(xAxisData, 0, thisScaleW, xValueLocator);
    } else {
      console.warn(["Assign wrong xAxisData", xAxisData]);
    }
  }

  let subChartCount = 0;
  Children.forEach(children, (child) => {
    if ("sub" === get(child, ["props", "multiChart"])) {
      subChartCount++;
    }
  });
  let mainChartScaleH = thisScaleH - 20 - (subChartScaleH + 20) * subChartCount;
  if (mainChartScaleH < subChartScaleH) {
    mainChartScaleH = subChartScaleH;
    thisScaleH = (subChartScaleH + 20) * (subChartCount + 1);
  }

  const handler = {
    onMouseEnter: (e) => {
      setState((prev) => ({
        ...prev,
        hideCrosshairY: false,
      }));
    },
    onMouseLeave: (e) => {
      setState((prev) => ({
        ...prev,
        hideCrosshairY: true,
      }));
    },
    onMove: (e) => {
      setState((prev) => ({
        ...prev,
        hideCrosshairY: false,
        crosshairX: get(e, ["point", 0]),
      }));
    },
    handleEl: (el) => {
      if (el) {
        lastEl.current = el;
      }
    },
  };

  return {
    isLoad,
    scaleW: thisScaleW,
    scaleH: thisScaleH,
    mainChartScaleH,
    subChartScaleH,
    thisXScale,
    handler,
    children,
    crosshair,
    crosshairX,
    hideCrosshairY,
  };
};

const MultiChart = (props) => {
  const {
    isLoad,
    scaleW,
    scaleH,
    mainChartScaleH,
    subChartScaleH,
    thisXScale,
    handler,
    children,
    crosshair,
    crosshairX,
    hideCrosshairY,
  } = useMultiChart(props) || {};

  if (!isLoad) {
    return null;
  }

  let high = 0;
  return (
    <ChartElement
      {...props}
      scaleW={scaleW}
      scaleH={scaleH}
      onMouseEnter={handler.onMouseEnter}
      onMouseLeave={handler.onMouseLeave}
      refCb={handler.handleEl}
    >
      {Children.map(children, (child, key) => {
        const childScaleH =
          "main" === child.props.multiChart ? mainChartScaleH : subChartScaleH;
        high += 20 + childScaleH;
        return build(child)({
          scaleH: childScaleH,
          transform: `translate(${adjustX}, ${high - childScaleH})`,
          key,
          scaleW,
          crosshair,
          crosshairX,
          hideCrosshairY,
          onMove: handler.onMove,
          xScale: thisXScale,
        });
      })}
    </ChartElement>
  );
};

export default MultiChart;
