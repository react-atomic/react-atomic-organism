import React, {Component, cloneElement} from 'react'; 
import {mixClass, reactStyle, SemanticUI} from 'react-atomic-molecule';
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
        this.handleChange(this.backward);
    }

    handleRight = () =>
    {
        this.handleChange(this.forward);
    }

    handleChange = selected =>
    {
        this.setState({ selected });
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
            style,
            className,
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
        const thumbChild = [];
        const childs = [];
        React.Children.forEach(
            children,
            (child) => {if (child) { childs.push(child); }}
        );

        childs.forEach( (child, i) => {
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
                        selected,
                        selectEl: child,
                        children: children,
                        handleChange: this.handleChange
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
                    className: mixClass(
                        thisThumbAttr.className,
                        {
                            active: i === selected
                        }
                    ),
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
                let thisChild = get(child, ['props', 'thumbContainer']);
                if (thisChild) {
                    thisChild = <Carousel>{thisChild}</Carousel>;
                } else {
                    thisChild = child;
                }
                thumbChild.push(
                    cloneElement(
                        thisChild,
                        newChildAttr
                    )
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

        const thisChildren = [];
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
                className="cards thumbs"
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
            {
               style: {
                ...Styles.container,
                ...style
               },
               className: mixClass(className, 'carousel-navigation')
            },
            thisChildren
        );
    }
}

export default CarouselNavigation;

const Styles = {
    container: {
         position: 'relative',
         marginBottom: 35,
    },
    thumbList: {
         fontSize: '1rem',
         width: '77%',
         margin: '-85px auto 0',
         minHeight: 50,
         padding: 5
    },
    thumb: {
        marginRight: 5,
        opacity: '.7',
        overflow: 'hidden',
        width: 50,
        height: 50,
        verticalAlign: 'bottom'
    },
    thumbHover: {
        opacity: 1  
    },

    thumbActive: {
        border: '1px solid #fff'
    }
};
