import React from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';

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
    return (
        <SemanticUI atom="g"
            transform={`translate(${x}, ${y})`}
        >
            <SemanticUI
                stroke="#000"
                atom="line"
                {...lineAttr}
            />
            <SemanticUI
                atom="text"
                {...textAttr}
            >
            {children}
            </SemanticUI>
        </SemanticUI>
    );
}

const Axis = ({scale, path, transform, ...props}) =>
{
    const {list, scaler} = scale;
    return (
        <SemanticUI
            atom="g"
            transform={transform}
            style={{fontSize:12}}
            className="axis"
        >
            <SemanticUI atom="path" d={path} />
            {
               list && keys(list).map( (k, i) =>
                    <Label
                        {...props}
                        {...list[k]}
                        key={i}
                    >
                        {k}
                    </Label>
               )
            }
        </SemanticUI>
    );
}

Axis.defaultProps = {
};

export default Axis;
