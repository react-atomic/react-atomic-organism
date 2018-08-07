import React, {PureComponent, Children, cloneElement} from 'react'
import getStyle from 'get-style'
import getOffset from 'getoffset'
import {Group, Rect, Text} from 'organism-react-graph'
import get from 'get-object-value'

import DragAndDrop from './DragAndDrop'

const keys = Object.keys

class BoxGroup extends PureComponent
{
    state = {
        rectW: 0,
        rectH: 0,
        x: 0, 
        y: 0,
        boxsPos: {} 
    }

    childrenEl = {}

    handleXY = (x, y) =>
    {
        this.setState({x, y})
    }

    componentDidMount()
    {
        const el = this.el
        const offset = getOffset(el)
        const {w, h} = offset
        let startY = 0
        const boxsPos = {}
        keys(this.childrenEl).forEach(
            cKey => {
                const cEl = this.childrenEl[cKey]
                const cElOffset = getOffset(cEl)
                startY += cElOffset.h
                boxsPos[cKey] = {
                    y: startY,
                    w: cElOffset.w,
                    h: cElOffset.h
                } 
            }
        )
        this.setState({
            rectW: w + 10,
            rectH: startY + 5,
            boxsPos
        })
    }

    render()
    {
        const {children} = this.props
        const {rectW, rectH, boxsPos, x, y} = this.state
        const translate = `translate(${x}, ${y})`
        return (
            <Group transform={translate} refCb={el => this.el = el}>
                <DragAndDrop
                    x={x}
                    y={y}
                    onXY={this.handleXY}
                    style={Styles.rect}
                    component={(
                        <Rect
                            rx="5"
                            ry="5"
                            width={rectW}
                            height={rectH}
                        />
                    )}
                />
                {Children.map(children, (c, ck) => cloneElement(c, {
                    key: ck,
                    x: 5,
                    y: get(boxsPos, [ck, 'y'], 0),
                    width: get(boxsPos, [ck, 'w'], 0),
                    height: get(boxsPos, [ck, 'h'], 0),
                    refCb: el => this.childrenEl[ck] = el
                }))}
            </Group>
        )
    }
}

export default BoxGroup

const Styles = {
    rect: {
        stroke: '#999',
        fill: '#fff'
    }
}
