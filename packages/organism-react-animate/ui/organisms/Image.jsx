import React, {Component} from 'react';
import {
    Image
} from 'react-atomic-molecule';

import Animate from '../organisms/Animate';

const image = (props) =>
{
    const {animate, ...others} = props;
    return <Image {...others}/>;
}

class AnimateImage extends Component
{
    static defaultProps = {
        animate: {
            enter: 'fadeIn-1500',
            leave: 'fadeOut-500',
        }
    };

    constructor(props)
    {
        super(props);
        this.state = {
            image: image(props)
        };
    }


    componentWillReceiveProps(props)
    {
        const self = this;
        const {animate} = props;
        setTimeout(()=>{
            self.setState({image: null});
        });
        let delay = 100;
        if (animate.leave) {
            delay = this.ani.leaveTimeout+100;
        }
        setTimeout(()=>{
            self.setState({
                image: image(props)
            });
        },delay);
    }

    render()
    {
        const {animate} = this.props;
        const {image} = this.state;
        return (
            <Animate {...animate} ref={o=>this.ani=o}>
            {image}
            </Animate>
        );
    }
}

export default AnimateImage;
