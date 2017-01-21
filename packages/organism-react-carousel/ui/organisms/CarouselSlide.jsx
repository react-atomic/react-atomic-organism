import React, {Component} from 'react'; 
import { SemanticUI, reactStyle } from 'react-atomic-molecule';

import CarouselList from '../organisms/CarouselList';
import CarouselSwipe from '../organisms/CarouselSwipe';

class CarouselSlide extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            height: 'auto'
        };
    }

    handleHeight = (height)=>
    {
        this.setState({
            height: height
        });
    }

    render()
    {
        const {...others} = this.props;
        return (
            <SemanticUI style={{
                ...Styles.container,
                height: this.state.height
            }}>
                <CarouselList
                    {...others}
                    innerContainer={
                        <CarouselSwipe 
                            onHeight={this.handleHeight}
                        />
                    }
                />
            </SemanticUI>
        );
    }
}

export default CarouselSlide;

const Styles = {
    container: {
        overflow: 'hidden'
    }
};
