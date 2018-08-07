import React, {PureComponent} from 'react'
import {Circle} from 'organism-react-graph'

import DragAndDrop from './DragAndDrop'

class ConnectPoint extends PureComponent
{
    state = {
        x: 0,
        y: 0
    }

    handleXY = (x, y) =>
    {
        this.setState({x, y})
    }

    handleDragStart = start =>
    {
        const {onShow} = this.props
        onShow(true)
        console.log(start)
    }

    handleDrag = () =>
    {
        const {x, y} = this.state        
    }

    render()
    {
        const {onShow, style, ...props} = this.props
        const {x, y} = this.state        
        return (
            <DragAndDrop
                {...props}
                style={{...style}}
                x={x}
                y={y}
                onXY={this.handleXY}
                onDragStart={this.handleDragStart}
                onDragEnd={()=>onShow(false)}
                onDrag={this.handleDrag}
                component={(
                    <Circle 
                        fill="#3c5d9b"
                        fillOpacity="0.4"
                        r="5"
                    />
                )}
            />
        )
    }
}

export default ConnectPoint
