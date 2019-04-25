import React, {PureComponent} from 'react'
import {Line as LineGraph, Area, Group} from 'organism-react-graph'

import CancelButton from '../organisms/CancelButton'

class Line extends PureComponent
{
    static defaultProps = {
      markerEnd: 'url(#marker-arrow-head)'
    }

    state={
        isHover: false,
    }

    handleMouseEnter = e =>
    {
        this.setState({
            isHover: true
        })
    }

    handleMouseLeave = e =>
    {
        this.setState({
            isHover: false
        })
    }

    handleClickCancelBtn = e =>
    {
        const {host, name} = this.props
        host.oConn.deleteLine(name)
    }

    handleClick = e =>
    {
      const {onClick} = this.props
      if ('function' === typeof onClick) {
        onClick(e, this)
      }
    }

    getName()
    {
      return this.props.name
    }

    render()
    {
        const {start, end, from, to, host, onClick, ...props} = this.props
        const {isHover} = this.state
        const areaSize = 1
        let area = null
        let cancelButton = null
        let areaStyle = Styles.area
        let isShowedCancel = false
        if (from && to) {
            if (isHover) {
                areaStyle = {...areaStyle, ...Styles.hover}
                isShowedCancel = true    
            }
            cancelButton = (
                <CancelButton 
                    x={start.x}
                    y={start.y}
                    onClick={this.handleClickCancelBtn}
                    show={isShowedCancel}
                />
            )
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
            <Group>
                <LineGraph
                    {...props}
                    start={start}
                    end={end}
                    curve={true}
                    style={Styles.line}
                />
                <Group
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.handleClick}
                >
                    {area}
                    {cancelButton}
                </Group>
            </Group>
        )
    }
}

export default Line

const Styles = {
    line: {
        stroke: '#333',
        strokeWidth: 1.5,
        fill: 'none',
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
