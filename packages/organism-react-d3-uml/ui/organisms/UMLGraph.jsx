import React, {PureComponent} from 'react'
import {Graph, Rect, Circle} from 'organism-react-graph'
import get from 'get-object-value'

import BoxGroup from '../organisms/BoxGroup'
import Box from '../organisms/Box'
import Line from '../organisms/Line'

let lineCounts = 0
const keys = Object.keys

class UMLGraph extends PureComponent
{
    state = {
        lines: {}    
    }

    addLine()
    {
        const name = 'line-'+lineCounts
        lineCounts++
        const lineEl = <Line key={name} name={name} />
        this.setState(({lines})=>{
            lines[name] = lineEl
            return lines
        })
        return name
    }

    updateLine(name, start, end)
    {
        const lineEl = <Line key={name} name={name} start={start} end={end} />
        this.setState(({lines})=>{
            lines[name] = lineEl
            return lines
        })
    }

    deleteLine(name)
    {
        this.setState(({lines})=>{
            delete lines[name]
            return lines
        })
    }

    getEl()
    {
        return this.el
    }

    render()
    {
        const {data} = this.props
        const {lines} = this.state
        return (
            <Graph refCb={el => this.el = el}>
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
                        key => lines[key] 
                    )
                }
            </Graph> 
        )
    }
}

export default UMLGraph
