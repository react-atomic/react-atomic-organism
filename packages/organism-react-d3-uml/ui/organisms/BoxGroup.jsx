import React, {PureComponent, Children, cloneElement} from 'react'
import getStyle from 'get-style'
import getOffset from 'getoffset'
import {Group, Rect, Text} from 'organism-react-graph'
import get from 'get-object-value'

import DragAndDrop from './DragAndDrop'

const keys = Object.keys
let boxGroupId = 1 

class BoxGroupHeader extends PureComponent
{
    render()
    {
        const {children, x, y, width} = this.props
        const translate = `translate(0, 20)` 
        return (
            <Group
                transform={translate}
                style={Styles.boxGroupHeader}
            >
                <Rect x="0" y="-20" rx="5" width={width} height="20" fill="#aaa"></Rect>
                <Text y="-5" alignCenter parentWidth={width} fill="#fff">{children}</Text>
            </Group>
        )
    }
}

class BoxGroup extends PureComponent
{
    state = {
        rectW: 0,
        rectH: 0,
        absX: 0, 
        absY: 0,
        boxsPos: {},
    }

    boxNameInvertMap = {}
    childrenEl = {}

    move = (absX, absY) =>
    {
        this.setState({absX, absY})
    }

    getBoxIdByName(name)
    {
        return get(this, ['boxNameInvertMap', name])
    }

    setBoxNameInvertMap(id, name)
    {
        this.boxNameInvertMap[name] = id  
    }

    getWH()
    {
        const {rectW: width, rectH: height} = this.state
        return {width, height}
    }

    getName()
    {
        const {name} = this.props
        return name
    }

    getId()
    {
        return this.id
    }

    constructor(props)
    {
        super(props)
        const {host, name} = props
        this.id = boxGroupId
        boxGroupId++
        host.addBoxGroup(this.id, this, name)
    }

    componentDidMount()
    {
        const el = this.el
        const offset = getOffset(el)
        const {w, h} = offset
        let startY = 20 
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
        const {name, children, host, data} = this.props
        const {rectW, rectH, boxsPos, absX, absY} = this.state
        const translate = `translate(${absX}, ${absY})`
        return (
            <Group transform={translate} refCb={el => this.el = el}>
                <DragAndDrop
                    absX={absX}
                    absY={absY}
                    onAbsXY={this.move}
                    style={Styles.rect}
                    zoom={host.getTransform}
                    component={(
                        <Rect
                            rx="5"
                            ry="5"
                            width={rectW}
                            height={rectH}
                        />
                    )}
                />
                <BoxGroupHeader width={rectW}>{name}</BoxGroupHeader>
                {Children.map(children, (c, ck) => cloneElement(c, {
                    boxGroupId: this.id,
                    key: ck,
                    pos: translate,
                    host,
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
    },
    boxGroupHeader: {
        pointerEvents: 'none' 
    }
}
