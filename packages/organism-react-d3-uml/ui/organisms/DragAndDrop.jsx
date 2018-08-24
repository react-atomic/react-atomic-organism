import React, {PureComponent, cloneElement, createElement, isValidElement} from 'react'
import {d3DnD, d3Event} from 'd3-lib'
import getOffset, {unifyTouch} from 'getoffset'

class DragAndDrop extends PureComponent
{
    static defaultProps = {
        absX: 0,
        absY: 0
    }

    start = {}

    handleStart = () =>
    {
        const {onDragStart} = this.props
        const e = d3Event()
        const {x, y, sourceEvent} = e
        const {pageX, pageY} = unifyTouch(sourceEvent)
        const offset = getOffset(this.el)
        this.start = {
            x,
            y,
            elAbsX: (pageX - offset.left) * 2,
            elAbsY: (pageY - offset.top) * 2,
        }
        if ('function' === typeof onDragStart) {
            onDragStart(this.start)
        }
    }

    handleDrag = () =>
    {
        const e = d3Event()
        const {x: moveX, y: moveY} = e
        const {x: startX, y: startY, elAbsX, elAbsY} = this.start
        let {absX, absY, onAbsXY, onDrag} = this.props
        absX += startX + moveX - elAbsX
        absY += startY + moveY - elAbsY
        onAbsXY(absX, absY)
        if ('function' === typeof onDrag) {
            onDrag(e.sourceEvent)
        }
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
        const {component, style, onAbsXY, absX, absY, onDragStart, onDrag, onDragEnd, ...props} = this.props
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
