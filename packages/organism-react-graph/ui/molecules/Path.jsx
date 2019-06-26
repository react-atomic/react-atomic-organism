import React from 'react';
import {SemanticUI} from 'react-atomic-molecule';

const Path = props => <SemanticUI {...props} />;

Path.defaultProps = {
  ui: false,
  atom: 'path',
};

export default Path;
