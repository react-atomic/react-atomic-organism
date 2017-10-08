import React, {Component, cloneElement} from 'react'; 
import { SemanticUI, reactStyle } from 'react-atomic-molecule';
import get from 'get-object-value';
import CarouselList from '../organisms/CarouselList';
import Carousel from '../organisms/Carousel';

class CarouselNavigation extends Component
{
    static defaultProps = {
        infinity: true,
    };

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
            carouselAttr,
            container,
            children,
            thumbAttr,
            infinity,
            onSelected,
            ...others
        } = this.props;

        let total = 0;
        const selected = get(this.state, ['selected'], 0); 
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
        let activeChildren = null;
        let activeEl = false;
        let thumbChild = React.Children.map(
            children,
            (child, i) => {
                let activeStyle={};
                if (i === selected) {
                    child = cloneElement(
                        child,
                        {
                            ...carouselAttr,
                            key: i
                        }
                    );
                    activeChildren = onSelected({
                        selectEl: child,
                        children: children
                    });
                    this.forward = i+1;
                    activeStyle = Styles.thumbActive;
                    activeEl = child;
                }
                if (!activeEl) {
                    this.backward = i;
                }
                total++;
                const newChildAttr = {
                    key: i,
                    ...thisThumbAttr,
                    onClick: () => {
                        this.setState({
                            selected: i 
                        });
                    },
                    style: null,
                    styles: reactStyle({
                        ...thisThumbAttr.style,
                        ...activeStyle
                    }, false, false)
                };
                let thisChild = get(child, ['props', 'thumbEl']);
                if (thisChild) {
                    thisChild = <Carousel>{thisChild}</Carousel>;
                } else {
                    thisChild = child;
                }
                return cloneElement(
                    thisChild,
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

        let thisChildren = [];
        thisChildren.push(
            <CarouselList
                key={0}
                onLeft={this.handleLeft}
                onRight={this.handleRight}
            >
                {cloneElement(activeChildren, others)}
            </CarouselList>
        );
        thisChildren.push( //thumb
            <CarouselList
                key={1}
                {...others}
                style={Styles.thumbList}
                className="cards"
            >
                {thumbChild}
            </CarouselList>
        );
        /*container*/
        let thisContainer;
        if (container) {
            thisContainer = container;
        } else {
            thisContainer = <SemanticUI /> 
        }
        return cloneElement(
            thisContainer,
            null,
            thisChildren
        );
    }
}

export default CarouselNavigation;

const Styles = {
    thumbList: {
         position: 'absolute',
         bottom: 30,
         left: '12%',
         paddingLeft: 1,
         fontSize: '1rem'
    },
    thumb: {
        marginRight: 5,
        opacity: '.7',
        overflow: 'hidden',
        width: 50,
        height: 50 
    },
    thumbHover: {
        opacity: 1  
    },

    thumbActive: {
        border: '1px solid #fff'
    }
};
