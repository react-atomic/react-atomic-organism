import React, {PureComponent} from 'react'
import {SemanticUI} from 'react-atomic-molecule'

class Line extends PureComponent
{
    render()
    {
       const props = this.props
       return (
            <SemanticUI atom="line" ui={false} {...props} />
       )
    }
}

export default Line 
