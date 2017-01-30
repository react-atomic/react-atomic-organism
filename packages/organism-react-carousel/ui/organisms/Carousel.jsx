import React, {Component} from 'react'; 
import { SemanticUI } from 'react-atomic-molecule';
import get from 'get-object-value';

class Carousel extends Component
{
    handleEnter = () =>
    {
        const hoverStyle = get(this.props, ['hoverStyle']);
        if (hoverStyle) {
            this.setState({
                hoverStyle: hoverStyle 
            });
        }
    }

    handleLeave = () =>
    {
        this.setState({
            hoverStyle: { }
        });
    }

    render()
    {
        const {style, hoverStyle, thumbEl, ...others} = this.props;
        const thisHoverStyle = get(this.state, ['hoverStyle'], {});
        return (
            <SemanticUI 
                {...others}
                style={{
                    ...Styles.container,
                    ...style,
                    ...thisHoverStyle
                }}
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
            />
        );
    }
}

export default Carousel;

const Styles = {
    container: {
        display: 'inline-block',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'hidden'
    }
};
