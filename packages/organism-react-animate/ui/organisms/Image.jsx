import React, {PureComponent} from 'react';
import { Image } from 'react-atomic-molecule';
import get from 'get-object-value';

import Animate from '../organisms/Animate';

const image = (props) =>
{
    const {animate, leaveStyle, ...others} = props;
    return <Image {...others}/>;
}

class AnimateImage extends PureComponent
{
    static defaultProps = {
        animate: {
            enter: 'fadeIn-300',
            leave: 'fadeOut-300',
        },
        leaveStyle: {
            opacity: '.1'
        }
    };

    constructor(props)
    {
        super(props);
        this.state = {
            image: image(props)
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const props = this.props;
        const {animate, src, leaveStyle} = props;
        if ( src === prevProps.src ||
            'undefined' === typeof window
        ) {
            return;
        }
        const self = this;
        const oImg = new window.Image();
        self.setState({style: leaveStyle});
        oImg.onload = () => {
            self.setState({image: null});
            let delay = 100;
            if (animate.leave) {
                delay += get(self, ['aniEl', 'leaveTimeout'], 0);
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
            <Animate {...animate} style={style} ref={o=>this.aniEl=o}>
            {image}
            </Animate>
        );
    }
}

export default AnimateImage;
