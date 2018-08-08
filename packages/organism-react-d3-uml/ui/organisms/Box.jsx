import React, {PureComponent} from 'react'
import {Group, Text} from 'organism-react-graph'
import ConnectPoint from '../organisms/ConnectPoint'

class Box extends PureComponent
{
    isConnectPointDrag = false

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

    render()
    {
        const {children, host, refCb, x, y, width, height} = this.props 
        const {showConnectPoint} = this.state
        const translate = `translate(${x}, ${y})` 
        const cy = -(height / 2 - 5)
        let connectPointStyle = Styles.invisible
        if (showConnectPoint) {
            connectPointStyle = {}
        }
        const connectPoints = [
            <ConnectPoint
                host={host}
                key="left"
                cy={cy}
                cx={-12}
                onShow={this.setIsConnectPointDrag}
                style={connectPointStyle}
            />,
            <ConnectPoint 
                host={host}
                key="right"
                cx={width+12}
                cy={cy}
                onShow={this.setIsConnectPointDrag}
                style={connectPointStyle}
            />
        ]
        return (
            <Group 
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                refCb={refCb}
                transform={translate}
            >
                <Text>
                    {children}
                </Text>
                {connectPoints}
            </Group>
        )
    }
}

export default Box

const Styles = {
    invisible: {
        visibility: 'hidden'
    }
}
