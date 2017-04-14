import React, {createElement} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';

import Axis from '../organisms/Axis';

const XAxis = ({
    length,
    height,
    textRotate,
    transform,
    ...props
}) => {
    let params = {
       path: `M0,1V0H${length}V1`,
       y: 0,
       lineAttr: {
          x2: 0,
          y2: 6
       },
       ...props
    };
    
    if ('undefined' === typeof transform && height) {
        params = {
            ...params,
            transform: `translate(0, ${height})`
        };
    }

    if (textRotate) {
        params = {
            ...params,
            textAttr: {
                x: 0,
                y: 9,
                dx: '-.8em',
                dy: '-.55em',
                transform: `rotate(${textRotate})`,
                style: {
                    textAnchor: 'end' 
                }
            }
        };
    } else {
        params = {
            ...params,
            textAttr: {
                y: 20,
                style: {
                    textAnchor: 'middle' 
                }
            }
        };
    }
    return createElement(
        Axis,
        params
    ); 
}

XAxis.defaultProps = {
    textRotate: -90 
};

export default XAxis;
