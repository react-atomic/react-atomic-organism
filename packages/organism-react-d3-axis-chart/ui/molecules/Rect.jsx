import React from 'react'; 

import { SemanticUI } from 'react-atomic-molecule';

const Rect = (props)=>
{
    return <SemanticUI {...props} />;
}

Rect.defaultProps = {
    atom: 'rect'
};

export default Rect;
