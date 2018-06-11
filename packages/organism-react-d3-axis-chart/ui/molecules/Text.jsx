import React from 'react'; 

import { SemanticUI } from 'react-atomic-molecule';

const Text = props =>
<SemanticUI {...props} />

Text.defaultProps = {
    atom: 'text'
};

export default Text;
