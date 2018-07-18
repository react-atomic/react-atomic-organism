import React from 'react'; 
import {
    SemanticUI
} from 'react-atomic-molecule';

const ArrowShape = ({color, ...props}) =>
    <SemanticUI
        atom="polygon"
      /*points="-10,8.25 0,0 0,16.5"*/
        points="10,8.5 0,16 1,1"
        fill={color}
        stroke={color}
    />

export default ArrowShape;
