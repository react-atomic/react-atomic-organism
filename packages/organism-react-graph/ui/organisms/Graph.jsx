import React from 'react'
import {SemanticUI} from 'react-atomic-molecule'

const Graph = props => <SemanticUI {...props} />

Graph.defaultProps = {atom: 'svg'};

export default Graph
