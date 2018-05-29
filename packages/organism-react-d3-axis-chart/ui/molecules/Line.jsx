import React from 'react'; 

import { SemanticUI } from 'react-atomic-molecule';

import {line} from 'd3-lib';

const Line = ({start, end, svgLine, ...props}) =>
{
    const params = {};
    if (start && end) {
       if (svgLine) {
         params.x1 = start.x;
         params.y1 = start.y;
         params.x2 = end.x;
         params.y2 = end.y;
       } else {
         params.d = line(start, end); 
       }
    }
    if (svgLine) {
        params.atom = 'line';
    }
    return (
    <SemanticUI
        {...props}
        {...params}
    />
    );
}

Line.defaultProps = {
    atom: 'path',
    fill: 'none',
    stroke: '#3182bd'
};

export default Line;
