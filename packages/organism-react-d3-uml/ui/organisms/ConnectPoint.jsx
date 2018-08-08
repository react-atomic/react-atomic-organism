import React, {PureComponent} from 'react'
import {Circle} from 'organism-react-graph'
import getOffset, {mouse, toSvgXY} from 'getoffset'
import getStyle from 'get-style'
import {d3Select} from 'd3-lib'

import DragAndDrop from './DragAndDrop'

class ConnectPoint extends PureComponent
{
    state = {
        absX: 0,
        absY: 0
    }

    start = {}

    handleAbsXY = (absX, absY) =>
    {
        this.setState({absX, absY})
    }

    handleDragStart = start =>
    {
        const {onShow, host} = this.props
        onShow(true)
        const lineId = host.addLine()
        start.center = this.getCenter()
        start.lineId = lineId
        this.start = {...start} 
    }

    handleDrag = e =>
    {
        const {host} = this.props
        const {lineId, center} = this.start
        const el = host.getEl()
        const end = mouse(e, el)
        host.updateLine(lineId, center, {
            x: end[0],
            y: end[1]
        })
    }


    getCenter()
    {
        const el = this.dnd.getEl()
        const bbox = el.getBBox()
        const ctm = el.getCTM() 
        const region = el.getBoundingClientRect() 
        const {left, top, width, height} = region

        const x = Math.floor(bbox.x + ctm.e + width / 2)
        const y = Math.floor(bbox.y + ctm.f + height / 2)
        return {x, y} 
    }

    render()
    {
        const {host, onShow, style, ...props} = this.props
        const {absX, absY} = this.state        
        return (
            <DragAndDrop
                {...props}
                ref={el => this.dnd = el}
                style={{...style}}
                absX={absX}
                absY={absY}
                onAbsXY={this.handleAbsXY}
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
