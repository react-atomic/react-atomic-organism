import React from 'react'; 

import Group from '../molecules/Group';
import Rect from '../molecules/Rect';
import Text from '../molecules/Text';
import ArrowShape from '../molecules/ArrowShape';

const width = 37;
const height = 16.5;

const YAxisLabel = ({color, children, value, ...props}) =>
{
    const yPos = value - height /2;
    return (
    <Group 
        className="crosshair-label-y"
        transform={`translate(-14, ${yPos})`}
        {...props}
    >
        <Rect
            fill={color}
            x={-width+1}
            height={height}
            width={width}
        />
        <ArrowShape
            fill={color}
        />
        <Text
            x={-width+2}
            y="12"
            fill="#fff"
        >
            {children}
        </Text>
    </Group>
    );
}

YAxisLabel.defaultProps = {
    color: '#454545'
};

export default YAxisLabel;
