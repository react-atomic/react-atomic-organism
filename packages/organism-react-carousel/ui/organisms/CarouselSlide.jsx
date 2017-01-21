import React, {Component} from 'react'; 
import { SemanticUI, reactStyle } from 'react-atomic-molecule';

import CarouselList from '../organisms/CarouselList';
import CarouselSwipe from '../organisms/CarouselSwipe';

class CarouselSlide extends Component
{
    render()
    {
        const {...others} = this.props;
        return (
            <SemanticUI>
                <CarouselList
                    {...others}
                    innerContainer={<CarouselSwipe />}
                />
            </SemanticUI>
        );
    }
}

export default CarouselSlide;
