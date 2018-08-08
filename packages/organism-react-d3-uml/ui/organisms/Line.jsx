import React, {PureComponent} from 'react'
import {Line as LineGraph} from 'organism-react-graph'

class Line extends PureComponent
{
    render()
    {
        const props = this.props
        return (
            <LineGraph
                {...props}
                curve={true}
                style={Styles.line}
            />
        )
    }
}

export default Line

const Styles = {
    line: {
        stroke: '#333',
        strokeWidth: 1.5
    }
}
