import { useReturn } from "reshow-return";
import get from "get-object-value";

import Group from "../molecules/Group";
import Rect from "../molecules/Rect";
import Text from "../molecules/Text";

const XAxisLabel = ({
  fontSize = 18,
  color,
  invertedColor,
  reducer,
  subReducer,
  hideCrosshairLabel,
  scale,
  format,
  ...props
}) => {
  const { crosshairX: value, hideCrosshairY: hideCrosshair } = useReturn(
    ["crosshairX", "hideCrosshairY"],
    reducer[0]
  );
  if (hideCrosshairLabel || hideCrosshair || value == null) {
    return null;
  }

  const displayText = format(scale.scaler.invert(value));

  const textWidth = (fontSize / 2) * 1.2;
  const width = textWidth * get(displayText, ["length"], 0);
  const halfWidth = width / 2;
  let posValue = value;
  if (posValue >= halfWidth) {
    posValue -= halfWidth;
  }
  return (
    <Group
      className="crosshair-label-x"
      transform={`translate(${posValue}, 0)`}
      {...props}
    >
      <Rect fill={color} x="0" height="16" width={width} />
      <Text
        x={halfWidth}
        y="8"
        fill={invertedColor}
        textAnchor="middle"
        alignmentBaseline="central"
        style={{ fontSize }}
      >
        {displayText}
      </Text>
    </Group>
  );
};

export default XAxisLabel;
