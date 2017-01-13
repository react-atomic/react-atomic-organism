import React, {Component} from 'react'; 
import { SemanticUI, reactStyle } from 'react-atomic-molecule';
import get from 'get-object-value';
import Animate from 'organism-react-animate';

import CarouselList from '../organisms/CarouselList';

class CarouselAnimation extends Component
{
    backward = null;
    forward = null;
    handleLeft = () =>
    {
        this.setState({
            selected:  this.backward
        });
    }

    handleRight = () =>
    {
        this.setState({
            selected:  this.forward
        });
    }

    static defaultProps = {
        infinity: true,
        animate: {
            enter: 'fadeIn-500',
            leave: 'fadeOut-500',
        }
    }

    render()
    {
        const {animate, carouselAttr, children, style, infinity, ...others} = this.props;

        const selected = get(this.state, ['selected'], 0); 
        let activeEl;
        let total = 0;
        const thumbAttr = {
            ...carouselAttr,
            hoverStyle: Styles.thumbHover,
            className: 'link card',
            style: {
                ...get(carouselAttr, ['style'], {}),
                ...Styles.thumb,
            }
        };
        let thumbChild = React.Children.map(
            children,
            (child, i) => {
                let activeStyle={};
                if (i === selected) {
                    activeEl = React.cloneElement(
                        child,
                        {
                            ...carouselAttr,
                            key: i
                        }
                    );
                    this.forward = i+1;
                    activeStyle = Styles.activeStyle;
                }
                if (!activeEl) {
                    this.backward = i;
                }
                total++;
                const newChildAttr = {
                    ...thumbAttr,
                    onClick: () => {
                        this.setState({
                            selected: i 
                        });
                    },
                    styles: reactStyle({
                        ...thumbAttr.style,
                        ...activeStyle
                    }, false, false)
                };
                return React.cloneElement(
                    child,
                    newChildAttr
                );
            }
        );
        if (this.forward >= total) {
            if (infinity) {
                this.forward = 0;
            } else {
                this.forward = total - 1;
            }
        }
        if (infinity && 0 === selected) {
            this.backward = total - 1;
        }

        /*thumb*/
        const thumbList = (
            <CarouselList
                {...others}
                style={Styles.thumbList}
                className="cards"
            >
                {thumbChild}
            </CarouselList>
        );

        return (
            <SemanticUI style={style}>
                <CarouselList
                    {...others}
                    onLeft={this.handleLeft}
                    onRight={this.handleRight}
                >
                    <Animate {...animate}>{activeEl}</Animate>
                </CarouselList> 
                {thumbList}
            </SemanticUI>
        );
    }
}

export default CarouselAnimation;

const Styles = {
    thumbList: {
         position: 'absolute',
         bottom: 30,
         left: '12%',
         paddingLeft: 1
    },
    thumb: {
        marginRight: 5,
        opacity: '.7',
        overflow: 'hidden',
        width: 50,
        height: 'auto'
    },
    thumbHover: {
        opacity: 1  
    },
    activeStyle: {
        border: '1px solid #fff'
    }
};
