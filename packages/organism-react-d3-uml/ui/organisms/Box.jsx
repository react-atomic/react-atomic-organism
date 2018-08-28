import React, {PureComponent} from 'react'
import {Group, Text, Rect, getDistance} from 'organism-react-graph'

import ConnectPoint from '../organisms/ConnectPoint'

let boxId = 1 

class Box extends PureComponent
{
    isConnectPointDrag = false
    points = []

    state = {
        showConnectPoint: false
    }

    handleMouseEnter = () => {
        this.setState({showConnectPoint: true})
    }

    handleMouseLeave = () => {
        setTimeout(()=> {
            if (!this.isConnectPointDrag) {
                this.setState({showConnectPoint: false})
            }
        }, 1000)
    }

    setIsConnectPointDrag = bool => {
        this.isConnectPointDrag = bool
    }

    getRecentPoint(center)
    {
        const points = [] 
        const distance = []
        const distanceMap = {}
        this.points.forEach( (p, key) => {
            points[key] = p.getCenter() 
            let pointDistance = getDistance(center, points[key])
            distance[key] = pointDistance
            distanceMap[pointDistance] = {
                xy: points[key],
                obj: p
            } 
        });
        const max = Math.min(...distance) 
        return distanceMap[max]
    }

    getPoint(key)
    {
        return this.points[key]
    }

    constructor(props)
    {
        super(props)
        const {host, boxGroupId, name} = props
        this.id = boxId
        boxId++
        host.addBox(this.id, this, boxGroupId)
        host.getBoxGroup(boxGroupId).setBoxNameInvertMap(this.id, name)
    }

    render()
    {
        const {pos, name, host, refCb, x, y, width, height, boxGroupId} = this.props 
        const {showConnectPoint} = this.state
        const translate = `translate(${x}, ${y})` 
        const cy = -(height / 2 - 5)
        const connectPoints = [
            <ConnectPoint
                boxId={this.id}
                ref={el=>this.points[0]=el}
                show={showConnectPoint}
                pos={pos}
                host={host}
                key="left"
                cy={cy}
                cx={-12}
                onShow={this.setIsConnectPointDrag}
            />,
            <ConnectPoint
                boxId={this.id}
                ref={el=>this.points[1]=el}
                show={showConnectPoint}
                pos={pos}
                host={host}
                key="right"
                cx={width+12}
                cy={cy}
                onShow={this.setIsConnectPointDrag}
            />
        ]
        return (
            <Group 
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                refCb={refCb}
                transform={translate}
            >
                <Text data-id={this.id} data-group={boxGroupId}>
                    {name}
                </Text>
                {connectPoints}
            </Group>
        )
    }
}

export default Box

