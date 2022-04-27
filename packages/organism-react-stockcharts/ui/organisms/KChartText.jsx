import { useReturn } from "reshow-return";
import { Text, Span } from "organism-react-d3-axis-chart";
import get from "get-object-value";

const Item = ({ name, dx, dy, x, labelColor, color, header, text }) => [
  <Span
    className={`${name}-header`}
    key="header"
    fill={labelColor}
    x={x}
    dx={dx}
    dy={dy}
  >
    {header}
  </Span>,
  <Span className={`${name}-value`} key="value" fill={color}>
    {text}
  </Span>,
];

const KChartText = ({
  i18nDate = "D:",
  i18nOpen = "O:",
  i18nHigh = "H:",
  i18nLow = "L:",
  i18nClose = "C:",
  i18nVolume = "V:",
  vertical = false,
  labelColor = "#4682b4",
  color = "#000",
  style = { fontSize: 18 },
  reducer,
  data,
  xScale,
  tradeRowsLocator,
  tradeDateLocator,
  tradeOpenLocator,
  tradeHighLocator,
  tradeLowLocator,
  tradeCloseLocator,
  tradeVolumeLocator,
}) => {
  const { crosshairX } = useReturn(["crosshairX"], reducer[0]);
  const index = xScale.scaler.invertIndex(crosshairX);
  if (isNaN(index) || index < 0) {
    return null;
  }
  const indexData = get(tradeRowsLocator(data), [index]);
  if (!indexData) {
    return null;
  }
  const itemProps = {
    labelColor,
    color,
    dx: 10,
  };
  const newLineProps = {};
  if (vertical) {
    newLineProps.dy = 20;
    newLineProps.x = 0;
  }

  return (
    <Text style={style} className="kchart-text">
      <Item
        {...itemProps}
        name="date"
        header={i18nDate}
        text={tradeDateLocator(indexData)}
      />
      <Item
        {...itemProps}
        name="volume"
        header={i18nVolume}
        text={tradeVolumeLocator(indexData)}
      />
      <Item
        {...itemProps}
        name="open"
        header={i18nOpen}
        text={tradeOpenLocator(indexData)}
      />
      <Item
        {...itemProps}
        name="low"
        header={i18nLow}
        text={tradeLowLocator(indexData)}
      />
      <Item
        {...itemProps}
        {...newLineProps}
        name="high"
        header={i18nHigh}
        text={tradeHighLocator(indexData)}
      />
      <Item
        {...itemProps}
        name="close"
        header={i18nClose}
        text={tradeCloseLocator(indexData)}
      />
    </Text>
  );
};

export default KChartText;
