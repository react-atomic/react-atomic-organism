import React, {PureComponent} from 'react'
import {d3Zoom} from 'd3-lib'
import Group from '../organisms/Group';

class Zoom extends PureComponent
{
    state = {
        transform: '' 
    }

    componentDidMount()
    {
        const {el} = this.props
        setTimeout(()=>{
            d3Zoom({
                el: el(),
                scaleExtent: [-1, 8],
                callback: transform => {
                    this.setState({transform: transform})
                }
            })
        })
    }

    getTransform()
    {
        const {transform} = this.state
        return transform
    }

    render()
    {
        const {el, ...props} = this.props
        const {transform} = this.state
        return (
            <Group
                name="zoom"
                {...props}
                transform={transform+''}
            />
        )
    }
}

export default Zoom
