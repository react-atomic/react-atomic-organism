import React, {PureComponent} from 'react'
import {SemanticUI} from 'react-atomic-molecule'

class Text extends PureComponent
{
    render()
    {
       const props = this.props
       return (
            <SemanticUI atom="text" ui={false} {...props} />
       )
    }
}

export default Text
