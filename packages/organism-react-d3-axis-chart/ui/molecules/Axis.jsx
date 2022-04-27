import { build, mixClass, SemanticUI } from "react-atomic-molecule";
import get from "get-object-value";

import Text from "../molecules/Text";
import Group from "../molecules/Group";
import Line from "../molecules/Line";

const keys = Object.keys;

const Label = ({
  color,
  invertedColor,
  children,
  value,
  x,
  y,
  lineAttr,
  textAttr,
  ...props
}) => {
  if ("undefined" === typeof x) {
    x = value;
  } else if ("undefined" === typeof y) {
    y = value;
  }
  let text;
  if (!get(textAttr, ["hide"])) {
    delete textAttr.hide;
    text = (
      <Text {...textAttr} fill={color}>
        {children}
      </Text>
    );
  }
  return (
    <Group transform={`translate(${x}, ${y})`}>
      <Line stroke={color} {...lineAttr} />
      {text}
    </Group>
  );
};

const Axis = ({
  color = "#454545",
  invertedColor = "#fff",
  className,
  data,
  scale,
  path,
  transform,
  format = (i) => i,
  crosshairLabel,
  hideCrosshair,
  hideCrosshairLabel,
  reducer,
  subReducer,
  ...props
}) => {
  const { list } = scale;
  let thisCrosshairLabel = null;
  if (crosshairLabel) {
    thisCrosshairLabel = build(crosshairLabel)({
      color,
      invertedColor,
      hideCrosshairLabel,
      scale,
      format,
      reducer,
      subReducer,
    });
  }
  return (
    <Group
      transform={transform}
      style={{ fontSize: 12 }}
      className={mixClass("axis", className)}
    >
      <SemanticUI atom="path" d={path} fill={color} />
      {list &&
        keys(list).map((key) => (
          <Label
            key={key}
            color={color}
            invertedColor={invertedColor}
            {...props}
            {...list[key]}
          >
            {format(key)}
          </Label>
        ))}
      {thisCrosshairLabel}
    </Group>
  );
};

export default Axis;
