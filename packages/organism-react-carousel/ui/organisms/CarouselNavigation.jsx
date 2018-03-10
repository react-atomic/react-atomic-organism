import React, {PureComponent, cloneElement} from 'react'; 
import {mixClass, reactStyle, SemanticUI} from 'react-atomic-molecule';
import get from 'get-object-value';
import CarouselList from '../organisms/CarouselList';
import Carousel from '../organisms/Carousel';

class CarouselNavigation extends PureComponent
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
        const {onChange} = this.props;
        if ('function' === typeof onChange) {
            onChange(selected);
        }
        this.setState({ selected });
    }

    update = props =>
    {
        const {children, selected: propsSelected} = props;
        const childs = [];
        React.Children.forEach(
            children,
            (child) => {if (child) { childs.push(child); }}
        );
        let selected;
        if (childs) {
            // check propsSelected is valid.
            childs.some((child, i)=>{
                const key = get(child, ['props','name']) || i; 
                if (key === propsSelected) {
                    selected = key;
                    return true;
                } else {
                    return false;
                }
            });
            if (!selected) {
                selected = get(
                    childs.slice(0,1)[0],
                    ['props', 'name'],
                    0
                );
            }
        }
        return {
            selected,
            childs
        };
    }

    constructor(props)
    {
        super(props);
        this.state = this.update(props);
    }

    componentWillReceiveProps(props)
    {
        this.setState({...this.update(props)});
    }

    render()
    {
        const {selected, childs} = this.state;
        if (!childs || !childs.length) {
            return null;
        }
        const {
            style,
            className,
            carouselAttr,
            container,
            children,
            thumbAttr,
            infinity,
            selected: propsSelected,
            onChange,
            onSelected,
            ...others
        } = this.props;

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
        this.backward = null;
        this.forward = null;

        childs.forEach( (child, i) => {
            const key = get(child, ['props','name']) || i; 
            let activeStyle={}; //need always reset
            const isSelected = key === selected;
            childs[i] = child = cloneElement(
                child,
                {
                    ...carouselAttr,
                    name: key,
                    key
                }
            );
            if (isSelected) {
                activeStyle = Styles.thumbActive;
                activeEl = child;
                activeChildren = onSelected({
                    selected,
                    childs,
                    activeEl,
                    handleChange: this.handleChange
                });
            } else {
                if (!activeEl) {
                    this.backward = key;
                } else {
                    if (!this.forward) {
                        this.forward = key;
                    }
                }
            }
            const newThumbChildAttr = {
                key,
                ...thisThumbAttr,
                className: mixClass(
                    thisThumbAttr.className,
                    {
                        active: isSelected
                    }
                ),
                onClick: () => {
                    this.handleChange(key);
                },
                onMouseLeave: (e) => {
                    this.lastX = e.screenX;
                    this.lastY = e.screenY;
                },
                onMouseEnter: (e) => {
                    const lastX = e.screenX;
                    const lastY = e.screenY;
                    if (this.lastX === lastX && this.lastY === lastY) {
                        return;
                    }
                    this.handleChange(key);
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
                    newThumbChildAttr
                )
            );
        });
        if (null === this.forward && infinity && childs) {
            this.forward = childs.slice(0,1)[0].props.name;
        }
        if (null === this.backward && infinity && childs) {
            this.backward = childs.slice(-1)[0].props.name;
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
         padding: 5,
         whiteSpace: 'normal',
    },
    thumb: {
        margin: '0 5px 10px 0',
        opacity: '.5',
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
