import React from 'react'; 

import { SemanticUI } from 'react-atomic-molecule';

const Span = props =>
<SemanticUI {...props} />

Span.defaultProps = {
    atom: 'tspan'
};

export default Span;
