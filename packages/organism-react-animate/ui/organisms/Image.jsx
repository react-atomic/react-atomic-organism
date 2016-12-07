import React, {Component} from 'react';
import { Image } from 'react-atomic-molecule';

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
            enter: 'fadeIn-500',
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
        if ( this.props.src === props.src
           || 'undefined' === typeof window 
        ) {
            return;
        }
        const self = this;
        const {animate, src} = props;
        (new window.Image()).src = src;
        self.setState({image: null});
        let delay = 100;
        if (animate.leave) {
            delay = self.ani.leaveTimeout+150;
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
