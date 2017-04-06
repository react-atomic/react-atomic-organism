import React, {createElement} from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';

import Axis from '../organisms/Axis';

const XAxis = ({textRotate, length, ...props}) =>
{
    let params = {
       path: `M0,1V0H${length}V1`,
       y: 0,
       lineAttr: {
          x2: 0,
          y2: 6
       },
       ...props
    };

    if (textRotate) {
        params = {
            ...params,
            textAttr: {
                x: 0,
                y: 9,
                dx: '-.8em',
                dy: '-.55em',
                transform: 'rotate(-90)',
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
    textRotate: true
};

export default XAxis;
