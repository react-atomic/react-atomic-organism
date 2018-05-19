import React from 'react'; 

import { SemanticUI } from 'react-atomic-molecule';

import {line} from 'd3-lib';

const Line = ({start, end, ...props}) =>
{
    let params = {};
    if (start && end) {
       params.d = line(start, end); 
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
