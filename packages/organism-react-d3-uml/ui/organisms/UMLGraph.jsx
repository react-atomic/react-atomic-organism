import React, {PureComponent, cloneElement} from 'react'
import {Graph, Rect, Circle} from 'organism-react-graph'
import get from 'get-object-value'

import BoxGroup from '../organisms/BoxGroup'
import Box from '../organisms/Box'
import Line from '../organisms/Line'

let lineCounts = 0
const keys = Object.keys
let lazeTimer;

class UMLGraph extends PureComponent
{
    state = {
        lines: {}    
    }

    startPoint = null
    endPoint = null
    updateQueue = {}

    addLine()
    {
        const name = 'line-'+lineCounts
        lineCounts++
        this.setState(({lines})=>{
            lines[name] = {} 
            return {lines}
        })
        return name
    }

    updateLine(name, start, end)
    {
        const {lines} = this.state
        this.updateQueue[name] = {
            start: get(start, null, ()=>
                get(lines, [name, 'start'], 0)
            ),
            end: get(end, null, ()=>
                get(lines, [name, 'end'], 0)
            ),
        } 
        if (lazeTimer) {
            clearTimeout(lazeTimer)
            lazeTimer = false
        }
        lazeTimer = setTimeout(()=>{
            this.setState(({lines})=>{
                lines = {...lines, ...this.updateQueue}
                this.updateQueue = {}
                return {lines}
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
            delete lines[name]
            return {lines: {...lines}}
        })
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

    componentWillUnmount() 
    {
        if (lazeTimer) {
            clearTimeout(lazeTimer)
            lazeTimer = false
        }
    }

    render()
    {
        const {data, ...props} = this.props
        const {lines} = this.state
        return (
            <Graph refCb={el => this.el = el} {...props}>
                {
                    get(data, ['tables'], []).map(
                        (item, tbKey) => 
                        <BoxGroup 
                            host={this}
                            data={item}
                            key={'box-group-'+tbKey}
                        > 
                        {
                            get(item, ['cols'], []).map(
                                (colItem, colKey) => 
                                <Box
                                    key={'box-'+colKey} 
                                >
                                    {colItem}
                                </Box>
                            )
                        }
                        </BoxGroup>
                    )
                }
                {
                    keys(lines).map(
                        key => <Line {...lines[key]} name={key} key={key}/> 
                    )
                }
            </Graph> 
        )
    }
}

export default UMLGraph
