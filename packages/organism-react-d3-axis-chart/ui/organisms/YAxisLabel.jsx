import React from "react";
import get from "get-object-value";

import Group from "../molecules/Group";
import Rect from "../molecules/Rect";
import Text from "../molecules/Text";
import ArrowShape from "../molecules/ArrowShape";

const textWidth = 6.5;
const height = 16.5;

const YAxisLabel = ({ color="#454545", invertedColor, children, value, ...props }) => {
  const yPos = value - height / 2;
  const width = textWidth * get(children+'', ["length"], 0);
  return (
    <Group
      className="crosshair-label-y"
      transform={`translate(-14, ${yPos})`}
      {...props}
    >
      <Rect fill={color} x={-width + 1} height={height} width={width} />
      <ArrowShape color={color} />
      <Text
        x={-(width / 2) + 7}
        y="12"
        fill={invertedColor}
        textAnchor="middle"
      >
        {children}
      </Text>
    </Group>
  );
};

export default YAxisLabel;
