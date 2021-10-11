import React from "react";
import { mixClass } from "react-atomic-molecule";

import Candlestick from "../molecules/Candlestick";
import Group from "../molecules/Group";

const MultiCandlestick = ({
  tradeHighLocator,
  tradeLowLocator,
  tradeOpenLocator,
  tradeCloseLocator,
  data,
  allDataLocator,
  attrsLocator,
  xValueLocator,
  xScale,
  yScale,
  children,
  d3,
}) => {
  const thisData = allDataLocator(data) || [];
  if (!thisData.map) {
    console.warn(["Assign wrong MultiCandlestick.", data]);
    return null;
  }
  return (
    <Group className="data-group multi-candle-stick">
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

export default MultiCandlestick;
