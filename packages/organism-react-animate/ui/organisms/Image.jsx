import React, {Component} from 'react';
import {
    Image
} from 'react-atomic-molecule';

import Animate from '../organisms/Animate';

class AnimateImage extends Component
{
    static defaultProps = {
        animate: {
            enter: 'fadeIn-1500'
        }
    };

    constructor(props)
    {
        super(props);
        const {animate, ...others} = props;
        this.state = {
            image: <Image {...others}/> 
        };
    }

    componentWillReceiveProps(props)
    {
        const self = this;
        self.setState({image:null});
        const {animate, ...others} = props;
        setTimeout(()=>{
            self.setState({
                image: <Image {...others}/>
            });
        },100);
    }

    render()
    {
        const {animate, ...others} = this.props;
        return (
            <Animate {...animate}>
            {this.state.image}
            </Animate>
        );
    }
}

export default AnimateImage;
