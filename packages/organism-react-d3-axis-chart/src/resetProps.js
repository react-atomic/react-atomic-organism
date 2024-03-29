import get from "get-object-value";
import { useReduceStore } from "reshow-flux";

const resetProps = ({
  autoScale = true,
  scaleH = 500,
  scaleW = 500,
  subChartScaleH = 68,
  multiChart,
  reducer = useReduceStore(),
  crosshair,
  hideAxis = false,
  hideCrosshairXLabel,
  hideCrosshairYLabel,
  xValueLocator = (d) => d.x,
  yValueLocator = (d) => d.y,
  valuesLocator = (d) => d.values,
  attrsLocator = (d) => d.attrs,
  allDataLocator = (d) => d,
  mainChartDataLocator = (d) => get(d, [0], {}),
  xScale,
  yScaleMore,
  onMove,
  xAxisAttr,
  yAxisAttr,
  data,
  thresholds,
  children,

  /*Layout*/
  style,
  transform,
  color,
  invertedColor,
}) => ({
  autoScale,
  scaleH,
  scaleW,
  subChartScaleH,
  transform,
  multiChart,
  reducer,
  crosshair,
  hideAxis,
  hideCrosshairXLabel,
  hideCrosshairYLabel,
  xValueLocator,
  yValueLocator,
  valuesLocator,
  attrsLocator,
  allDataLocator,
  mainChartDataLocator,
  xScale,
  yScaleMore,
  onMove,
  xAxisAttr,
  yAxisAttr,
  data,
  thresholds,
  children,

  /*Layout*/
  style,
  transform,
  color,
  invertedColor,
});
export default resetProps;
