import React, {Component} from 'react'; 
import { mixClass, SemanticUI } from 'react-atomic-molecule';
import Animate from 'organism-react-animate';

import CarouselNavigation from '../organisms/CarouselNavigation';

class CarouselAnimation extends Component
{
    static defaultProps = {
        infinity: true,
        animate: {
            appear: 'fadeIn-500-550',
            enter: 'fadeIn-500-550',
            leave: 'fadeOut-500',
        }
    };

    handleSelected = ({selectEl, selected, handleChange}) =>
    {
        const { animate } = this.props;
        return ( 
            <Animate {...animate}>
            {selectEl}
            </Animate>
        );
    };

    render()
    {
        const {
            animate,
            className,
            style,
            infinity,
            ...others
        } = this.props;

        let classes = mixClass(
            'carousel-animation',
            className
        );

        return (
            <CarouselNavigation
                {...others}
                onSelected={this.handleSelected}
                container={
                    <SemanticUI
                        style={{...Styles.container, ...style}}
                        className={classes}
                    />
                }
            />
        );
    }
}

export default CarouselAnimation;

const Styles = {
    container: {
         position: 'relative',
    },
};
