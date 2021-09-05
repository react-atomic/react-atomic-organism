import React from "react";
import { mixClass } from "react-atomic-molecule";

import Candlestick from "../molecules/Candlestick";
import Group from "../molecules/Group";
import get from "get-object-value";

const MultiCandlestick = ({
  tradeHighLocator,
  tradeLowLocator,
  tradeOpenLocator,
  tradeCloseLocator,
  data,
  valuesLocator,
  attrsLocator,
  xValueLocator,
  xScale,
  yScale,
  children,
  d3,
}) => {
  const thisData = get(valuesLocator(data), null, []);
  if (!thisData.map) {
    console.warn(["Assign wrong MultiCandlestick.", thisData]);
    return null;
  }
  return (
    <Group className="data-group candle-stick-chart">
      {thisData.map((d, key) => {
        const x = xScale.scaler(xValueLocator(d));
        const open = tradeOpenLocator(d);
        const close = tradeCloseLocator(d);
        const arrY = [tradeHighLocator(d), tradeLowLocator(d), open, close].map(
          (y) => yScale.scaler(y)
        );
        arrY.sort((a, b) => a - b);
        const classes = mixClass({
          positive: close > open,
          negative: close < open,
          neutral: close === open,
        });
        return (
          <Candlestick
            x={x}
            y0={arrY[0]}
            y1={arrY[1]}
            y2={arrY[2]}
            y3={arrY[3]}
            width={xScale.length}
            key={key}
            className={classes}
          />
        );
      })}
      {children}
    </Group>
  );
};

MultiCandlestick.defaultProps = {
  valuesLocator: (d) => d.values,
  attrsLocator: (d) => d.attrs,
};

export default MultiCandlestick;
