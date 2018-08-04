import React, {PureComponent} from 'react'
import {SemanticUI} from 'react-atomic-molecule'

class Graph extends PureComponent
{
    render()
    {
       const props = this.props
       return (
            <SemanticUI atom="svg" {...props} />
       )
    }
}

export default Graph
