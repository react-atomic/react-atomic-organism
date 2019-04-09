import React, {PureComponent} from 'react'
import {Circle, DragAndDrop} from 'organism-react-graph'
import getOffset, {mouse} from 'getoffset'
import get from 'get-object-value'


const keys = Object.keys

class ConnectPoint extends PureComponent
{
    state = {
        absX: 0,
        absY: 0
    }

    start = false 

    lines = {}

    handleDragStart = e =>
    {
        const {start} = e;
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
        const {absX, absY, sourceEvent} = e;
        this.setState({absX, absY})
        const {host} = this.props
        const {lineId, center} = this.start
        let endXY
        const target = e.destTarget;
        if (target) {
            const targetId = target.getAttribute('data-id')
            const targetGroup = target.getAttribute('data-group')
            if (targetId && targetGroup) {
                const targetBox = host.getBox(targetId, targetGroup)
                const targetPoint = targetBox.getRecentPoint(center)
                endXY = targetPoint.xy
                host.setConnectEndPoint(targetPoint.obj)
            }
        }
        if (!endXY) {
            host.setConnectEndPoint(null)
            const el = host.getEl()
            const end = mouse(sourceEvent, el)
            const {x: endX, y: endY} = host.applyXY(el)(end[0], end[1])
            endXY = { x: endX, y: endY }
        }
        host.updateLine(lineId, { start: center, end: endXY })
    }

    handleDragEnd = e =>
    {
        const {onShow, host} = this.props
        const endPoint = host.getConnectEndPoint(this)
        const {lineId} = this.start 
        let isAddConnected = false
        if (endPoint) {
            isAddConnected = host.addConnected(lineId, this, endPoint)
        }
        if (!endPoint || !isAddConnected) {
            host.setConnectStartPoint(null)
            host.deleteLine(lineId)
        }

        onShow(false)
        this.start = false 
    }

    setLine(id, type)
    {
        this.lines[id] = type
    }

    delLine(id)
    {
        delete(this.lines[id])
    }

    getCenter()
    {
        const {host} = this.props
        const el = this.dnd.getEl()
        const bbox = el.getBBox()
        const region = el.getBoundingClientRect() 
        const {left, top, width, height} = region
        const x = bbox.x + width / 2 
        const y = bbox.y + height / 2
        return host.applyXY(el)(x, y) 
    }

    getBox()
    {
        return this.props.box
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
                    host.updateLine(lineId, {start: center})
                } else {
                    host.updateLine(lineId, {end: center})
                }
            })
        }
    }

    render()
    {
        const {pos, host, onShow, style, show, box, ...props} = this.props
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
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
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

const Styles = {
    container: {
        visibility: 'hidden'
    },
    visible: {
        visibility: 'visible'
    }
}
