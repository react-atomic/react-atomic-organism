import React, {PureComponent} from 'react'
import {Line as LineGraph, Area, Group} from 'organism-react-graph'

import CancelButton from '../organisms/CancelButton'

class Line extends PureComponent
{
    state={
        isHover: false
    }

    handleMouseEnter = e =>
    {
        this.setState({
            isHover: true
        })
        console.log('in')
    }

    handleMouseLeave = e =>
    {
        this.setState({
            isHover: false
        })
        console.log('out')
    }

    handleClickCancelBtn = e =>
    {
        console.log('click')
    }

    render()
    {
        const {start, end, ...props} = this.props
        const {isHover} = this.state
        const areaSize = 1
        let area = null
        let areaStyle = Styles.area
        let cancelButton = null
        if (true  && start) {
            areaStyle = {...areaStyle, ...Styles.hover}
            cancelButton = (
                <CancelButton 
                    x={start.x}
                    y={start.y}
                    onClick={this.handleClickCancelBtn}
                    style={Styles.cancel}
                    transform="scale(0.8)"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
            )
        }
        if (start && end) {
            area = (
                <Area
                    data={[{x: start.x+15, y: start.y}, {x: end.x-15, y: end.y}]}
                    xLocator={d=>d.x}
                    y0Locator={d=>d.y+areaSize}
                    y1Locator={d=>d.y-areaSize}
                    style={areaStyle}
                />
            )
        }
        return (
            <Group
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <LineGraph
                    {...props}
                    start={start}
                    end={end}
                    curve={true}
                    style={Styles.line}
                />
                {area}
                {cancelButton}
            </Group>
        )
    }
}

export default Line

const Styles = {
    line: {
        stroke: '#333',
        strokeWidth: 1.5
    },
    area: {
        strokeLinejoin: 'round',
        stroke: '#000',
        strokeWidth: 15,
        strokeOpacity: 0, 
        fill: 'none'
    },
    hover: {
        strokeOpacity: '.1',
    },

}
