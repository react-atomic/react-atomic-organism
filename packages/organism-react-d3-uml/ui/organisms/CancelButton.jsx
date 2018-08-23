import React, {PureComponent} from 'react'
import {Group} from 'organism-react-graph'
import CancelIcon from '../molecules/CancelIcon'

class CancelButton extends PureComponent
{

    componentDidMount()
    {
        console.log(this.el)
    }

    render()
    {
        const {x, y} = this.props
        const translate = `translate(${x}, ${y})` 
        return (
            <Group transform={translate} refCb={el=>this.el=el}>
                <CancelIcon
                    onClick={this.handleClickCancelBtn}
                    style={Styles.cancel}
                    transform="scale(0.8)"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
            </Group>
        )
    }
}

export default CancelButton

const Styles = {
    cancel: {
        fill: '#f00',
    }
}
