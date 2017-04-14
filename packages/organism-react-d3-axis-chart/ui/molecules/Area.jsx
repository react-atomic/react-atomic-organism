import React from 'react'; 

import {
    SemanticUI
} from 'react-atomic-molecule';

const Area = ({...props}) =>
{
    return <SemanticUI {...props} />;
}

Area.defaultProps = {
    atom: 'path',
    fill: 'steelblue',
    opacity: '0.1',
    stroke: 'none'
};

export default Area;
