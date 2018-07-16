import React from 'react'; 

import Group from '../molecules/Group';
import Rect from '../molecules/Rect';
import Text from '../molecules/Text';
import get from 'get-object-value';

const textWidth = 7.2;

const XAxisLabel = ({color, invertedColor, children, value, ...props}) =>
{
    const width = textWidth * get(children,['length'],0);
    const halfWidth = width / 2;
    if (value >= halfWidth) {
        value -= halfWidth;
    }
    return (
    <Group 
        className="crosshair-label-x"
        transform={`translate(${value}, 0)`}
        {...props}
    >
        <Rect
            fill={color}
            x="0"
            height="16"
            width={width}
        />
        <Text
            x={halfWidth}
            y="8"
            fill={invertedColor}
            textAnchor="middle"
            alignmentBaseline="central"
        >
            {children}
        </Text>
    </Group>
    );
};

export default XAxisLabel;
