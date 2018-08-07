import React, {PureComponent} from 'react'
import {SemanticUI} from 'react-atomic-molecule'

class Span extends PureComponent
{
    render()
    {
       const props = this.props
       return (
            <SemanticUI
                atom="tspan"
                ui={false}
                {...props}
            />
       )
    }
}

export default Span
