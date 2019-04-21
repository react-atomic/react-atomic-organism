import React from 'react';
import {SemanticUI} from 'react-atomic-molecule';

const Svg = props => <SemanticUI {...props} />;

Svg.defaultProps = {atom: 'svg'};

export default Svg;
