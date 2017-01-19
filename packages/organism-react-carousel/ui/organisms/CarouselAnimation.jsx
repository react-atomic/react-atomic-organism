import React, {Component} from 'react'; 
import { SemanticUI, reactStyle } from 'react-atomic-molecule';
import get from 'get-object-value';
import Animate from 'organism-react-animate';

import CarouselList from '../organisms/CarouselList';

class CarouselAnimation extends Component
{
    static defaultProps = {
        infinity: true,
        animate: {
            enter: 'fadeIn-500',
            leave: 'fadeOut-500',
        }
    }

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

    componentWillReceiveProps(props)
    {
        this.setState({
            selected: 0 
        });
    }

    render()
    {
        const {
            animate,
            className,
            carouselAttr,
            children,
            style,
            thumbAttr,
            infinity,
            ...others
        } = this.props;

        const selected = get(this.state, ['selected'], 0); 
        let activeEl;
        let total = 0;
        const thisThumbAttr = {
            ...carouselAttr,
            ...thumbAttr,
            hoverStyle: Styles.thumbHover,
            className: 'link card',
            style: {
                ...get(carouselAttr, ['style'], {}),
                ...Styles.thumb,
                ...get(thumbAttr, ['style'], {}),
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
                    ...thisThumbAttr,
                    onClick: () => {
                        this.setState({
                            selected: i 
                        });
                    },
                    styles: reactStyle({
                        ...thisThumbAttr.style,
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
            <SemanticUI
                style={{...Styles.container, ...style}}
                className={className}
            >
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
    container: {
         position: 'relative',
    },
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
