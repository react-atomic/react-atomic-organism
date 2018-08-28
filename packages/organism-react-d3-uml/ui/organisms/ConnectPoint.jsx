import React, {PureComponent} from 'react'
import {Circle} from 'organism-react-graph'
import getOffset, {mouse, unifyTouch} from 'getoffset'
import getStyle from 'get-style'

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
        let endXY
        e = unifyTouch(e)
        const target = document.elementFromPoint(e.clientX, e.clientY)
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
            const end = mouse(e, el)
            endXY = { x: end[0], y: end[1] }
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
        const el = this.dnd.getEl()
        const bbox = el.getBBox()
        const ctm = el.getCTM() 
        const region = el.getBoundingClientRect() 
        const {left, top, width, height} = region

        const x = Math.floor(bbox.x + ctm.e + width / 2)
        const y = Math.floor(bbox.y + ctm.f + height / 2)
        return {x, y} 
    }

    getBoxId()
    {
        return this.props.boxId
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
        const {pos, host, onShow, style, show, boxId, ...props} = this.props
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
