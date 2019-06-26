import React from 'react';
import {SemanticUI} from 'react-atomic-molecule';

const Svg = props => <SemanticUI {...props} />;

Svg.defaultProps = {
  ui: false,
  atom: 'svg',
  width: '100%'
};

export default Svg;
