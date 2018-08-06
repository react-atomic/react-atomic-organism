import React, {PureComponent} from 'react'
import {SemanticUI} from 'react-atomic-molecule'

class Group extends PureComponent
{
    render()
    {
       const props = this.props
       return (
            <SemanticUI atom="g" ui={false} {...props} />
       )
    }
}

export default Group
