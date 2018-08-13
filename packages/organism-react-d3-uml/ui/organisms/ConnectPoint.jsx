import React, {PureComponent} from 'react'
import {Circle} from 'organism-react-graph'
import getOffset, {mouse, toSvgXY} from 'getoffset'
import getStyle from 'get-style'
import {d3Select} from 'd3-lib'

import DragAndDrop from './DragAndDrop'

const keys = Object.keys

class ConnectPoint extends PureComponent
{
    state = {
        absX: 0,
        absY: 0
    }

    start = false 

    lines = {}

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
        host.setConnectStartPoint(this)
    }

    handleDrag = e =>
    {
        const {host} = this.props
        const {lineId, center} = this.start
        const elEnd = host.getConnectEndPoint()
        let endXY
        if (elEnd) { 
            endXY = elEnd.getCenter() 
        } else {
            const el = host.getEl()
            const end = mouse(e, el)
            endXY = { x: end[0], y: end[1] }
        }
        host.updateLine(lineId, center, endXY)
    }

    handleDragEnd = e =>
    {
        const {onShow, host} = this.props
        const endPoint = host.getConnectEndPoint(this)
        const {lineId} = this.start 
        if (endPoint) {
            this.setLine(lineId, 'from')
            endPoint.setLine(lineId, 'to')
        } else {
            host.setConnectStartPoint(null)
            host.deleteLine(lineId)
            onShow(false)
        }
        this.start = false 
    }

    handleMouseEnter = e =>
    {
        const {host} = this.props
        const startPoint = host.getConnectStartPoint()
        if (startPoint) {
            host.setConnectEndPoint(this)
        }
    }

    handleMouseLeave = e =>
    {
        const {host} = this.props
        host.setConnectEndPoint(null)
    }

    setLine(id, type)
    {
        this.lines[id] = type
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

    isShow()
    {
        let {show} = this.props
        if (this.start) {
            show = true 
        }
        const linesLen = keys(this.lines).length
        if (linesLen) {
            show = true 
        }
        return show
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {pos} = this.props
        if (pos === prevProps.pos) {
            return
        }
        const lineKeys = keys(this.lines)
        if (lineKeys.length) {
            const {host} = this.props
            const center = this.getCenter()
            lineKeys.forEach( lineId => {
                const lineType = this.lines[lineId]
                if ('from' === lineType) {
                    host.updateLine(lineId, center)
                } else {
                    host.updateLine(lineId, null, center)
                }
            })
        }
    }

    render()
    {
        const {pos, host, onShow, style, show, ...props} = this.props
        const {absX, absY} = this.state        
        let thisStyle = { ...Styles.container, ...style }
        if (this.isShow()) {
            thisStyle = {...Styles.visible}
        }
        return (
            <DragAndDrop
                {...props}
                ref={el => this.dnd = el}
                style={thisStyle}
                absX={absX}
                absY={absY}
                onAbsXY={this.handleAbsXY}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onDrag={this.handleDrag}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
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

const Styles = {
    container: {
        visibility: 'hidden'
    },
    visible: {
        visibility: 'visible'
    }
}
