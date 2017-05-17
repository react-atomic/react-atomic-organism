import React from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
import Rect from '../molecules/Rect';
import Text from '../molecules/Text';

const width = 32;
const height = 16.5;

const YAxisLabel = ({color, children, value, ...props}) =>
{
    value -= 16.5 /2;
    return (
    <SemanticUI 
        atom="g"
        className="crosshair-label-y"
        transform={`translate(-10, ${value})`}
        {...props}
    >
        <Rect
            fill={color}
            x="-31"
            height={height}
            width={width}
        />
        <SemanticUI
            atom="polygon"
          /*  points="-10,8.25 0,0 0,16.5"*/
            points="10,8.5 0,16.5 0,0"
            fill={color}
        />
        <Text
            x="-25"
            y="12"
            fill="#fff"
        >
            {children}
        </Text>
    </SemanticUI>
    );
}

YAxisLabel.defaultProps = {
    color: '#454545'
};

export default YAxisLabel;
