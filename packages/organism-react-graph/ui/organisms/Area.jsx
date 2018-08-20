import React, {PureComponent} from 'react'
import {SemanticUI} from 'react-atomic-molecule'
import {hArea} from 'd3-lib'

class Area extends PureComponent
{
    static defaultProps = {
        atom: 'path',
        fillOpacity: '0.1',
        stroke: 'none'
    }

    render()
    {
       const {
        data,
        xLocator,
        y0Locator,
        y1Locator,
        ...props
       } = this.props
       const d = hArea(
        data,
        xLocator,
        y0Locator,
        y1Locator
       )
       return (
            <SemanticUI 
                ui={false}
                {...props}
                d={d}
            />
       )
    }
}

export default Area
