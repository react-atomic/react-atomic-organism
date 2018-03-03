import React, {Component} from 'react'; 
import { mixClass, SemanticUI } from 'react-atomic-molecule';
import Animate from 'organism-react-animate';

import CarouselNavigation from '../organisms/CarouselNavigation';

class CarouselAnimation extends Component
{
    static defaultProps = {
        animate: {
            appear: 'fadeIn-500-550',
            enter: 'fadeIn-500-550',
            leave: 'fadeOut-500',
        }
    };

    handleSelected = ({activeEl, selected, handleChange}) =>
    {
        const { animate } = this.props;
        return ( 
            <Animate {...animate}>
            {activeEl}
            </Animate>
        );
    };

    render()
    {
        const {
            animate,
            className,
            ...others
        } = this.props;

        let classes = mixClass(
            'carousel-animation',
            className
        );

        return (
            <CarouselNavigation
                {...others}
                className={classes}
                onSelected={this.handleSelected}
            />
        );
    }
}

export default CarouselAnimation;

