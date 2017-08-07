import React, {Component} from 'react';
import { Image } from 'react-atomic-molecule';

import Animate from '../organisms/Animate';

const image = (props) =>
{
    const {animate, leaveStyle, ...others} = props;
    return <Image {...others}/>;
}

class AnimateImage extends Component
{
    static defaultProps = {
        animate: {
            enter: 'fadeIn-300',
            leave: 'fadeOut-300',
        },
        leaveStyle: {
            opacity: '.3'
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
        const {animate, src, leaveStyle} = props;
        const oImg = new window.Image();
        self.setState({style: leaveStyle});
        oImg.onload = () => {
            self.setState({image: null});
            let delay = 100;
            if (animate.leave) {
                delay = self.ani.leaveTimeout + 100;
            }
            setTimeout(()=>{
                self.setState({
                    image: image(props),
                    style: null
                });
            },delay);
        };
        oImg.src = src;
    }

    render()
    {
        const {animate} = this.props;
        const {image, style} = this.state;
        return (
            <Animate {...animate} style={style} ref={o=>this.ani=o}>
            {image}
            </Animate>
        );
    }
}

export default AnimateImage;
