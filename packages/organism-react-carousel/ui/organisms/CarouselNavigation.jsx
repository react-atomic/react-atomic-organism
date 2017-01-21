import React, {Component} from 'react'; 
import { SemanticUI, reactStyle } from 'react-atomic-molecule';
import get from 'get-object-value';
import CarouselList from '../organisms/CarouselList';

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
        let carouselChildren = null;
        let activeEl = false;
        let thumbChild = React.Children.map(
            children,
            (child, i) => {
                let activeStyle={};
                if (i === selected) {
                    child = React.cloneElement(
                        child,
                        {
                            ...carouselAttr,
                            key: i
                        }
                    );
                    carouselChildren = onSelected({
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

        let thisChildren = [];
        thisChildren.push(
            <CarouselList
                key={0}
                {...others}
                onLeft={this.handleLeft}
                onRight={this.handleRight}
            >
                {carouselChildren}
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
        return React.cloneElement(
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
        height: 'auto'
    },
    thumbHover: {
        opacity: 1  
    },

    thumbActive: {
        border: '1px solid #fff'
    }
};
