import React, {Component, cloneElement, isValidElement} from 'react';
import {SemanticUI} from 'react-atomic-molecule';
import get from 'get-object-value';
import {mouse} from 'getoffset';

import Line from '../molecules/Line';
import Rect from '../molecules/Rect';
import Group from '../molecules/Group';
import XAxis from '../organisms/XAxis';
import YAxis from '../organisms/YAxis';
import Crosshair from '../organisms/Crosshair';

const adjustX = 60;
const adjustY = 20;

class BaseChart extends Component {
  d3 = {};
  state = {isLoad: false};

  handleMouseEnter = e => {
    const hideY = get(this, ['props', 'hideCrosshairY'], false);
    this.setState({
      hideCrosshairX: false,
      hideCrosshairY: hideY,
    });
  };

  handleMouseLeave = e => {
    const hideY = get(this, ['props', 'hideCrosshairY'], true);
    this.setState({
      hideCrosshairX: true,
      hideCrosshairY: hideY,
    });
  };

  handleMouseMove = e => {
    const point = mouse(e);
    this._mouseMove(point);
  };

  _mouseMove = point => {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(point);
    }
    this.setState({
      crosshairX: point[0],
      crosshairY: point[1],
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {crosshairX, hideCrosshairY} = nextProps;
    return {crosshairX, hideCrosshairY};
  }

  componentDidMount() {
    import('d3-lib').then(({stack, curve, scaleLinear, scaleBand, hArea}) => {
      this.d3 = {
        stack,
        curve,
        scaleLinear,
        scaleBand,
        hArea,
      };
      this.setState({
        isLoad: true,
      });
    });
  }

  render() {
    const {
      isLoad,
      crosshairX,
      crosshairY,
      hideCrosshairX,
      hideCrosshairY,
    } = this.state;
    if (!isLoad) {
      return false;
    }
    const {
      attrsLocator,
      data,
      children,
      valuesLocator,
      xValueLocator,
      yValueLocator,
      extraViewBox,
      thresholds,
      multiChart,

      /*axis*/
      hideAxis,
      scaleW,
      scaleH,
      xAxisAttr,
      yAxisAttr,
      color,
      invertedColor,
      xScale,
      yScaleMore,

      /*crosshair*/
      crosshair,
      onMouseMove,
      crosshairX: propsCrosshairX,
      hideCrosshairY: propsHideCrosshairY,
      hideCrosshairXLabel,
      hideCrosshairYLabel,

      ...props
    } = this.props;
    const thresholdLines = [];
    this.scaleW = scaleW;
    this.scaleH = scaleH;
    let xaxis = null;
    let yaxis = null;
    let thisCrosshair = null;
    let mouseHandlers = null;
    let thisExtraViewBox = extraViewBox;
    if (xScale) {
      this.xScale = xScale;
    } else {
      const xScaleData = get(xAxisAttr, ['data'], () =>
        valuesLocator(get(data, [0], {})),
      );
      if (!xScaleData.map) {
        console.warn(['Assign wrong xScaleData', xScaleData]);
        return null;
      }
      this.xScale = this.d3.scaleBand(xScaleData, 0, scaleW, xValueLocator);
    }
    const yScaleData = get(yAxisAttr, ['data'], () =>
      valuesLocator(get(data, [0], {})).map(d => yValueLocator(d)),
    );
    if (!yScaleData) {
      return false;
    }
    const thisYScaleMore = [].concat(thresholds || [], yScaleMore || []);
    this.yScale = this.d3.scaleLinear(
      yScaleData,
      scaleH,
      0,
      null,
      get(yAxisAttr, ['num']),
      thisYScaleMore,
    );
    if (!hideAxis) {
      xaxis = (
        <XAxis
          scale={this.xScale}
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
          scale={this.yScale}
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
    } else {
      thisExtraViewBox = adjustX;
    }
    if (thresholds) {
      thresholds.forEach((threshold, key) => {
        if (isNaN(threshold)) {
          return;
        }
        const yThreshold = this.yScale.scaler(threshold);
        thresholdLines.push(
          <Line
            start={{x: 0, y: yThreshold}}
            end={{x: scaleW, y: yThreshold}}
            stroke="#f00"
            strokeWidth="2"
            strokeDasharray="5,5"
            key={'threshold' + key}
            style={{opacity: '.5'}}
          />,
        );
      });
    }
    if (crosshair) {
      thisCrosshair = (
        <Crosshair
          key="crosshair"
          scaleW={scaleW}
          scaleH={scaleH}
          x={crosshairX}
          y={crosshairY}
          hideX={hideCrosshairX}
          hideY={hideCrosshairY}
          xScale={this.xScale}
          yScale={this.yScale}
        />
      );
      mouseHandlers = {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onMouseMove:  this.handleMouseMove
      };
    }
    let childEl = children(this);
    if (isValidElement(childEl)) {
      childEl = cloneElement(childEl, {key: 'base-chart'});
    }
    const childArr = [
      childEl,
      xaxis,
      yaxis,
      thresholdLines,
      thisCrosshair,
      <Rect
        {...mouseHandlers}
        key="container"
        x="0"
        y="0"
        width={scaleW}
        height={scaleH}
        style={{pointerEvents: 'all', fill: 'none'}}
      />,
    ];
    if (multiChart) {
      return <Group {...props}>{childArr}</Group>;
    }
    return (
      <SemanticUI
        {...props}
        viewBox={`0 0 ${Math.round(scaleW + thisExtraViewBox)} ${Math.round(
          scaleH + thisExtraViewBox,
        )}`}>
        <Group transform={`translate(${adjustX}, ${adjustY})`}>
          {childArr}
        </Group>
      </SemanticUI>
    );
  }
}

BaseChart.defaultProps = {
  atom: 'svg',
  width: '100%',
  data: [],
  scaleW: 500,
  scaleH: 500,
  extraViewBox: 100,
  valuesLocator: d => d.values,
  xValueLocator: d => d.x,
  yValueLocator: d => d.y,
  hideAxis: false,
  preserveAspectRatio: 'xMidYMid meet',
};

export default BaseChart;
