import React, {Component} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';

class CarouselSwipe extends Component
{
    dragging = false;
    startX = null;

    getX(e)
    {
        const posX =(e.touches !== undefined) ? e.touches[0].pageX : e.clientX;
        return posX;
    }

    swipeStart = (e) =>
    {
        this.dragging = true;
        this.startX = this.getX(e);
    }

    swipeMove = (e) =>
    {
        if (!this.dragging) {
            return false; 
        }
        const posX = this.getX(e);
        const move = this.startX - posX;
    }

    swipeEnd = (e) =>
    {

    }

    render()
    {
        const {...others}  = this.props;
        return (
            <SemanticUI 
                className="carousel-swipe"
                style={Styles.container}
                {...others}
                onMouseDown={this.swipeStart}
                onMouseMove={this.swipeMove}
                onMouseUp={this.swipeEnd}
                onMouseLeave={this.swipeMove}
                onTouchStart={this.swipeStart}
                onTouchMove={this.swipeMove}
                onTouchEnd={this.swipeEnd}
                onTouchCancel={this.swipeMove}
            />
        );
    }
}

export default CarouselSwipe;

const Styles = {
    container: {
        display: 'inline-block'
    }
};
