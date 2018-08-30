import React, {PureComponent, cloneElement} from 'react'
import {Graph} from 'organism-react-graph'
import get, {getDefault} from 'get-object-value'
import {toSvgMatrixXY} from 'getoffset'

import Zoom from '../organisms/Zoom'
import BoxGroup from '../organisms/BoxGroup'
import Box from '../organisms/Box'
import Line from '../organisms/Line'

let lineCounts = 0
const keys = Object.keys
let lazeTimer;

class UMLGraph extends PureComponent
{
    state = {
        lines: {},
    }

    static defaultProps = {
        boxGroupsLocator: d => d.tables,
        boxsLocator: d => d.cols,
        boxGroupNameLocator: d => d.name,
        boxNameLocator: d => d,
        connsLocator: d => d,
        connFromBoxGroupLocator: d => d,
        connToBoxGroupLocator: d => d,
        connFromBoxLocator: d => d,
        connToBoxLocator: d => d,
    }

    boxGroupNameInvertMap = {}
    boxMap = {}
    startPoint = null
    endPoint = null
    updateQueue = {}
    connects = {}

    addLine()
    {
        const name = 'line-'+lineCounts
        lineCounts++
        this.setState(({lines})=>{
            lines[name] = {} 
            return {lines: {...lines}}
        })
        return name
    }

    updateLine(name, params)
    {
        const {lines} = this.state
        this.updateQueue[name] = {
            ...this.updateQueue[name],
            ...params
        } 
        if (lazeTimer) {
            clearTimeout(lazeTimer)
            lazeTimer = false
        }
        lazeTimer = setTimeout(()=>{
            this.setState(({lines})=>{
                keys(this.updateQueue).forEach(
                    name => {
                        if (get(lines, [name])) {
                            lines[name] = {
                                ...lines[name],
                                ...this.updateQueue[name]
                            }
                        }
                    }
                )
                this.updateQueue = {}
                return {lines: {...lines}}
            })
        })
    }

    deleteLine(name)
    {
        if (lazeTimer) {
            clearTimeout(lazeTimer)
            lazeTimer = false
        }
        this.setState(({lines})=>{
            const line = lines[name]
            const from = line.from
            const to = line.to
            if (from) {
                from.delLine(name)
            }
            if (to) {
                to.delLine(name)
            }
            if (from && to) {
                const {
                    mergeId,
                    invertMergeId
                } = this.getConnectIds(from, to)
                delete this.connects[mergeId]
                delete this.connects[invertMergeId]
            }
            delete lines[name]
            return {lines: {...lines}}
        })
    }

    getConnectIds(from, to)
    {
        const fromBoxId = from.getBox().getId()
        const toBoxId = to.getBox().getId()
        const mergeId = `${fromBoxId}-${toBoxId}`
        const invertMergeId = `${toBoxId}-${fromBoxId}`
        return {
            fromBoxId,
            toBoxId,
            mergeId,
            invertMergeId,
        }
    }

    getConnectNames(from, to)
    {
        const ids = this.getConnectIds(from, to)
        const fromBox = from.getBox()
        const toBox = to.getBox()
        const fromBoxGroup = fromBox.getBoxGroup() 
        const toBoxGroup = toBox.getBoxGroup()
        const fromBoxName = fromBox.getName()
        const fromBoxGroupName = fromBoxGroup.getName()
        const toBoxName = toBox.getName()
        const toBoxGroupName = toBoxGroup.getName()
        return {
            ...ids,
            fromBoxName,
            toBoxName,
            fromBoxGroupName,
            toBoxGroupName
        }
    }

    getConnects()
    {
        const conns = this.connects 
        const {lines} = this.state
        const results = []
        keys(conns).forEach( key => {
            const lineId = conns[key]
            const {from, to} = lines[lineId]
            if (!from || !to) {
                return
            }
            results.push(
                this.getConnectNames(from, to)
            )
        })
        return results
    }

    addConnected(lineId, from, to)
    {
        const {
            fromBoxId,
            toBoxId,
            mergeId,
            invertMergeId
        } = this.getConnectIds(from, to)
        const connects = this.connects 
        if (!get(connects, [mergeId]) &&
            !get(connects, [invertMergeId])
        ) {
            connects[mergeId] = lineId
            from.setLine(lineId, 'from')
            to.setLine(lineId, 'to')
            this.updateLine(lineId, {from, to, start:from.getCenter(), end:to.getCenter()})
            return true
        } else {
            return false
        }
    }

    getEl()
    {
        return this.el
    }

    setConnectStartPoint(el)
    {
        this.startPoint = el
        return this.startPoint
    }

    getConnectStartPoint()
    {
        return this.startPoint
    }

    setConnectEndPoint(el)
    {
        this.endPoint = el
    }

    getConnectEndPoint(el)
    {
        return this.endPoint
    }

    getBoxGroupIdByName(name)
    {
        const id = get(this, ['boxGroupNameInvertMap', name])
        return id
    }

    addBoxGroup(id, obj, name)
    {
       this.boxGroupNameInvertMap[name] = id
       this.boxMap[id] = {obj, boxs: {}}
    }

    addBox(id, obj, groupId)
    {
       this.boxMap[groupId].boxs[id] = obj
    }

    getBox(id, groupId)
    {
        return get(this, ['boxMap', groupId, 'boxs', id])
    }

    getBoxGroup(id)
    {
        return get(this, ['boxMap', id, 'obj'])
    }

    getTransform = () =>
    {
        const t = this.zoom.getTransform()
        return t
    }
    
    applyXY = dom => (pX, pY) =>
    {
        const zoom = this.getTransform()
        const zoomX = get(zoom, ['x'], 0)
        const zoomY = get(zoom, ['y'], 0)
        const zoomK = get(zoom, ['k'], 1)
        let{x, y} = toSvgMatrixXY(dom)(pX, pY)
        x = (x - zoomX) / zoomK 
        y = (y - zoomY) / zoomK
        return {x, y}
    }
    
    syncPropConnects()
    {
        const {
            data,
            connsLocator,
            connFromBoxGroupLocator,
            connToBoxGroupLocator,
            connFromBoxLocator,
            connToBoxLocator,
        } = this.props
        const conns = connsLocator(data)
        if (!conns || !conns.length) {
            return
        }
        const groupConn = {} 
        const addGroupConn = (from, to) =>
        {
            const a = [from, to].sort()
            groupConn[a[0]+'-'+a[1]] = [from, to] 
        }
        conns.forEach( conn => {
            const fromBoxGroupName = connFromBoxGroupLocator(conn)
            const fromBoxName = connFromBoxLocator(conn)
            const toBoxGroupName = connToBoxGroupLocator(conn)
            const toBoxName = connToBoxLocator(conn)
            if (!fromBoxGroupName || !fromBoxName || !toBoxGroupName || !toBoxName) {
                console.warn('Sync props conns failed', [
                    fromBoxGroupName,
                    fromBoxName,
                    toBoxGroupName,
                    toBoxName,
                    conn
                ])
                return
            }
            const fromBoxGroupId = this.getBoxGroupIdByName(fromBoxGroupName)
            const toBoxGroupId = this.getBoxGroupIdByName(toBoxGroupName)
            const fromBoxId = this.getBoxGroup(fromBoxGroupId).getBoxIdByName(fromBoxName) 
            const toBoxId = this.getBoxGroup(toBoxGroupId).getBoxIdByName(toBoxName) 
            const lineId = this.addLine()
            addGroupConn(fromBoxGroupId, toBoxGroupId)
            this.addConnected(
                lineId,
                this.getBox(fromBoxId, fromBoxGroupId).getPoint(1), 
                this.getBox(toBoxId, toBoxGroupId).getPoint(0) 
            )
        })
        return groupConn
    }

    componentDidMount()
    {
        setTimeout(()=>{
            const groupConn = this.syncPropConnects()
            import('../../src/dagre').then( dagreAutoLayout => {
                dagreAutoLayout = getDefault(dagreAutoLayout)
                const newXY = dagreAutoLayout({...this.boxMap}, groupConn)
                get(keys(newXY), null, []).forEach(
                    key => {
                        const oBoxGroup = this.getBoxGroup(key) 
                        oBoxGroup.move(newXY[key].x, newXY[key].y)
                    }
                )
            })
        })
    }

    componentWillUnmount() 
    {
        if (lazeTimer) {
            clearTimeout(lazeTimer)
            lazeTimer = false
        }
    }

    render()
    {
        const {
            data,
            boxGroupNameLocator,
            boxNameLocator,
            boxsLocator,
            boxGroupsLocator,
            connsLocator,
            connFromBoxGroupLocator,
            connToBoxGroupLocator,
            connFromBoxLocator,
            connToBoxLocator,
            ...props
        } = this.props
        const {lines} = this.state
        return (
            <Graph refCb={el => this.el = el} {...props}>
                <Zoom el={()=>this.getEl()} ref={el=>this.zoom = el}>
                {
                    boxGroupsLocator(data).map(
                        (item, tbKey) => 
                        <BoxGroup 
                            host={this}
                            data={item}
                            name={boxGroupNameLocator(item)}
                            key={'box-group-'+tbKey}
                        > 
                        {
                            boxsLocator(item).map(
                                (colItem, colKey) =>{ 
                                return (
                                <Box
                                    key={'box-'+colKey} 
                                    name={boxNameLocator(colItem)}
                                />
                                )}
                            )
                        }
                        </BoxGroup>
                    )
                }
                {
                    keys(lines).map(
                        key => <Line {...lines[key]} name={key} key={key} host={this} /> 
                    )
                }
                </Zoom>
            </Graph> 
        )
    }
}

export default UMLGraph
