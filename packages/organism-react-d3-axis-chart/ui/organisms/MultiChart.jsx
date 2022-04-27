import { useState, useRef, useEffect, Children } from "react";
import { build } from "react-atomic-molecule";
import { useMounted } from "reshow-hooks";
import { useReduceStore } from "reshow-flux";
import get from "get-object-value";
import getoffset from "getoffset";
import { win } from "win-doc";
import { debounce } from "call-func";
import { useD3 } from "d3-lib";

import ChartElement from "../molecules/ChartElement";
import resetProps from "../../src/resetProps";

const adjustX = 60;

const getParentWH = (el) => {
  const parentEl = el.parentNode;
  return getoffset(parentEl);
};

const execResize = debounce((lastEl, setState) => {
  const { w, h } = getParentWH(lastEl.current);
  setState((prev) => {
    if (w !== prev.scaleW || h !== prev.scaleH) {
      return {
        ...prev,
        scaleW: w,
        scaleH: h,
      };
    } else {
      return prev;
    }
  });
}, 50);

const useMultiChart = (props) => {
  const [isLoad, d3] = useD3(props.onD3Load);
  const [{ scaleW: stateScaleW, scaleH: stateScaleH }, setState] = useState({});
  const isMounted = useMounted();
  const reducer = useReduceStore();

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
    const handleResize = () => {
      execResize({ args: [lastEl, setState] });
    };
    const needAutoScale = isLoad && !win().__null && autoScale;

    if (needAutoScale) {
      win().addEventListener("resize", handleResize);
    }
    return () => {
      if (needAutoScale) {
        win().removeEventListener("resize", handleResize);
      }
    };
  }, [isLoad]);

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
      reducer[1]({ hideCrosshairY: false });
    },
    onMouseLeave: (e) => {
      reducer[1]({ hideCrosshairY: true });
    },
    onMove: (e) => {
      reducer[1]({ crosshairX: get(e, ["point", 0]) });
    },
    handleEl: (el) => {
      if (el) {
        lastEl.current = el;
        execResize({ args: [lastEl, setState] });
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
    reducer,
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
    reducer,
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
          reducer,
          onMove: handler.onMove,
          xScale: thisXScale,
        });
      })}
    </ChartElement>
  );
};

export default MultiChart;
