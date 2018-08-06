import React, {PureComponent} from 'react'
import {Group, Rect} from 'organism-react-graph'
import getStyle from 'get-style'
import {d3DnD, d3Event, d3Select} from 'd3-lib'
import getOffset from 'getoffset'

class DragAndDrop extends PureComponent
{
    start = {}
    state = {
        x: 0,
        y: 0
    }

    handleStart = () =>
    {
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
    }

    handleDrag = () =>
    {
        const e = d3Event()
        const {x: moveX, y: moveY} = e
        this.setState(({x,y})=>{
            const {x: startX, y: startY, absX, absY} = this.start
            x += startX + moveX - absX
            y += startY + moveY - absY
            return {
                x,
                y
            };
        });
    }

    componentDidMount()
    {
        d3DnD({
            el: this.el,
            start: this.handleStart,
            drag: this.handleDrag, 
        })
    }

    render()
    {
        const {...props} = this.props
        const {x, y} = this.state
        const translate = `translate(${x}, ${y})` 
        return (
            <Group 
                {...props}
                refCb={el=>this.el = el}
                transform={translate}
            />
        )
    }
}

export default DragAndDrop
