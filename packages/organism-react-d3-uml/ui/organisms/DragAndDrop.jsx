import React, {PureComponent, cloneElement, createElement, isValidElement} from 'react'
import {d3DnD, d3Event, d3Select} from 'd3-lib'
import getOffset from 'getoffset'

class DragAndDrop extends PureComponent
{
    static defaultProps = {
        x: 0,
        y: 0
    }

    start = {}

    handleStart = () =>
    {
        const {onDragStart} = this.props
        const e = d3Event()
        const {x, y, sourceEvent} = e
        const {pageX, pageY} = sourceEvent
        const offset = getOffset(this.el)
        this.start = {
            x,
            y,
            absX: (pageX - offset.left) * 2,
            absY: (pageY - offset.top) * 2,
        }
        if ('function' === typeof onDragStart) {
            onDragStart(this.start)
        }
    }

    handleDrag = () =>
    {
        const {onDrag} = this.props
        if ('function' === typeof onDrag) {
            onDrag()
        }
        const e = d3Event()
        const {x: moveX, y: moveY} = e
        const {x: startX, y: startY, absX, absY} = this.start
        let {x, y, onXY} = this.props
        x += startX + moveX - absX
        y += startY + moveY - absY
        onXY(x, y)
    }

    handleEnd = () =>
    {
        const {onDragEnd} = this.props
        if ('function' === typeof onDragEnd) {
            onDragEnd()
        }
    }

    getEl()
    {
        return this.el
    }

    componentDidMount()
    {
        d3DnD({
            el: this.getEl(),
            start: this.handleStart,
            drag: this.handleDrag,
            end: this.handleEnd
        })
    }

    render()
    {
        const {component, style, onXY, x, y, onDragStart, onDrag, onDragEnd, ...props} = this.props
        const translate = `translate(${x}, ${y})`
        const build = (isValidElement(component)) ?
            cloneElement :
            createElement
        return build(
            component,
            {
                ...props,
                refCb: el => this.el = el,
                style: { ...style, ...Styles.container }
            }
        )
    }
}

export default DragAndDrop

const Styles = {
    container: {
        cursor: 'move',
        pointerEvents:'all'
    }
}
