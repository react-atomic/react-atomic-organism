import React, {cloneElement} from 'react'; 
import {
    mixClass,
    SemanticUI
} from 'react-atomic-molecule';
import get from 'get-object-value';

import Text from '../molecules/Text';
import Group from '../molecules/Group';

const keys = Object.keys;

const Label = ({
    children,
    value,
    x,
    y,
    lineAttr,
    textAttr,
    ...props
}) => {
    if ("undefined" === typeof(x)) {
        x = value;
    } else if ("undefined" === typeof(y)) {
        y = value;
    }
    let text;
    if (!get(textAttr, ['hide'])) {
        delete textAttr.hide;
        text = (
            <Text {...textAttr}>
                {children}
            </Text>
        );
    }
    return (
        <Group
            transform={`translate(${x}, ${y})`}
        >
            <SemanticUI
                stroke="#000"
                atom="line"
                {...lineAttr}
            />
            {text}
        </Group>
    );
}

const Axis = ({
    className,
    data,
    scale,
    path,
    transform,
    format,
    crosshairLabel,
    crosshairValue,
    hideCrosshair,
    hideCrosshairLabel,
    ...props
}) =>
{
    const {list, scaler} = scale;
    let thisCrosshairLabel = null; 
    if ( !hideCrosshairLabel &&
        !hideCrosshair &&
        crosshairValue &&
        crosshairLabel
    ) 
    {
        thisCrosshairLabel = cloneElement(
            crosshairLabel,
            {
                children: format(scaler.invert(crosshairValue)),
                value: crosshairValue
            }
        );
    }

    return (
        <Group
            transform={transform}
            style={{fontSize:12}}
            className={mixClass('axis', className)}
        >
            <SemanticUI atom="path" d={path} />
            {
               list && keys(list).map( (k, i) =>
                    <Label
                        {...props}
                        {...list[k]}
                        key={i}
                    >
                        {format(k)}
                    </Label>
               )
            }
            {thisCrosshairLabel}
        </Group>
    );
}

Axis.defaultProps = {
    format: i=>i
};

export default Axis;
