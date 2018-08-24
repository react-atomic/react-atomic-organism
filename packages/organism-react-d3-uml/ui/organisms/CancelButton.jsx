import React, {PureComponent} from 'react'
import {Group, Circle} from 'organism-react-graph'
import CancelIcon from '../molecules/CancelIcon'

class CancelButton extends PureComponent
{
    state = {r: 0}

    componentDidMount()
    {
        const el = this.el
        const bbox = el.getBBox()
        const {width} = bbox
        if (width) {
            this.setState({r: width / 2})
        }
    }

    render()
    {
        const {x, y, style, onClick} = this.props
        const {r} = this.state
        let thisCircle = null
        if (r) {
            thisCircle = (
                <Circle
                    r={r+1}
                    cx={r+2}
                    cy={r+2}
                    fill="transparent"
                />
            )
        }
        const translate = `translate(${x}, ${y})` 
        return (
            <Group
                refCb={el => this.el = el}
                style={style}
                transform={translate}
                onClick={onClick}
            >
                <CancelIcon
                    style={Styles.cancel}
                    transform="scale(0.8)"
                />
                {thisCircle}
            </Group>
        )
    }
}

export default CancelButton

const Styles = {
    cancel: {
        fill: '#f00',
    },
    circle: {
        strokeLinejoin: 'round',
        strokeWidth: 15,
        strokeOpacity: 1, 
        fill: 'none'
    }
}
