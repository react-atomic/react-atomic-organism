import React from "react";
import get from "get-object-value";
import { MultiHArea, MultiCandlestick } from "organism-react-d3-axis-chart";

const AreasOverlay = ({
  areasLocator,
  areasValuesLocator,
  areaXLocator,
  areaY0Locator,
  areaY1Locator,
  data,
  ...others
}) =>
  !areasLocator(data) ? null : (
    <MultiHArea
      {...others}
      valuesLocator={areasValuesLocator}
      xValueLocator={areaXLocator}
      areaY0Locator={areaY0Locator}
      areaY1Locator={areaY1Locator}
      data={areasLocator(data)}
    />
  );

const CandlestickOverlay = ({
  data,
  tradeRowsLocator,
  tradeDateLocator,
  tradeHighLocator,
  tradeLowLocator,
  tradeOpenLocator,
  tradeCloseLocator,
  ...others
}) => {
  return !tradeRowsLocator(data) ? null : (
    <MultiCandlestick
      {...others}
      data={data}
      allDataLocator={tradeRowsLocator}
      xValueLocator={tradeDateLocator}
      tradeHighLocator={tradeHighLocator}
      tradeLowLocator={tradeLowLocator}
      tradeOpenLocator={tradeOpenLocator}
      tradeCloseLocator={tradeCloseLocator}
    />
  );
};

const overlays = {
  areas: AreasOverlay,
  candlesticks: CandlestickOverlay,
};

export default overlays; 
