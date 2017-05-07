import React from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';
import get from 'get-object-value';

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
        text = (<SemanticUI
                atom="text"
                {...textAttr}
            >
            {children}
        </SemanticUI>);
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
            {text}
        </SemanticUI>
    );
}

const Axis = ({data, scale, path, transform, format, ...props}) =>
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
                        {format(k)}
                    </Label>
               )
            }
        </SemanticUI>
    );
}

Axis.defaultProps = {
    format: (i)=>i
};

export default Axis;
