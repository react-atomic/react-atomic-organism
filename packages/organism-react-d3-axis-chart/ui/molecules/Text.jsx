import React from 'react'; 

import { SemanticUI } from 'react-atomic-molecule';

const Text = (props)=>
{
    return <SemanticUI {...props} />;
}

Text.defaultProps = {
    atom: 'text'
};

export default Text;
