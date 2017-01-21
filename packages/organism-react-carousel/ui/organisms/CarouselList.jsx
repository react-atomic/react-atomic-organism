import React, {Component} from 'react'; 
import { SemanticUI, Icon, reactStyle } from 'react-atomic-molecule';
import ChevronRight from 'ricon/ChevronRight';
import get from 'get-object-value';

class ArrowIcon extends Component
{
    handleEnter = () =>
    {
        this.setState({
            hoverStyle: {
                opacity: '.9'
            }
        });
    }

    handleLeave = () =>
    {
        this.setState({
            hoverStyle: { }
        });
    }

    render()
    {
        const {style, iconStyle, onClick, ...others} = this.props;
        const hoverStyle = get(this.state, ['hoverStyle'], {});
        return (
            <SemanticUI
                style={{...Styles.arrowContainer, ...style, ...hoverStyle}}
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={onClick}
            >
                <Icon {...others}
                    styles={reactStyle({
                        ...Styles.icon,
                        ...iconStyle
                    }, false, false)}
                >
                    <ChevronRight />
                </Icon>
            </SemanticUI>
        );
    }
}

class CarouselList extends Component
{
    render()
    {
        const {children, carouselAttr, innerContainer, style, onLeft, onRight, ...others} = this.props;

        // <!-- Child
        let thisChildren = children;
        if (carouselAttr) {
            thisChildren = React.Children.map(
                children,
                (child)=>{
                return React.cloneElement(
                    child,
                    {...carouselAttr}
                );
            });
        }
        if (innerContainer) {
            thisChildren = React.cloneElement(
                innerContainer,
                {},
                thisChildren
            );
        }
        // Child --> 

        let arrowLeft;
        let arrowRight;
        if (onLeft) {
            arrowLeft = <ArrowIcon className="backward" onClick={onLeft} iconStyle={Styles.leftIcon} style={Styles.arrowLeft}/>;
        }
        if (onRight) {
            arrowRight = <ArrowIcon className="forward" onClick={onRight} iconStyle={Styles.rightIcon} style={Styles.arrowRight}/>;
        }

        return (
            <SemanticUI 
                {...others}
                style={{
                    ...Styles.container,
                    ...style,
                }}
            >
                {thisChildren}
                {arrowLeft} 
                {arrowRight} 
            </SemanticUI>
        );
    }
}

export default CarouselList;

const Styles = {
    container: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontSize: 0
    },
    arrowContainer: {
        width: '15%',
        height: '100%',
        position: 'absolute',
        top: 0,
        backgroundRepeat: 'repeat-x',
        opacity: '.3',
        cursor: 'pointer'
    },
    arrowLeft: {
        left: 0,
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%)',
    },
    arrowRight: {
        right: 0,
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%)',
    },
    icon: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: '50%',
        transform: ['translateY(-50%)'],
        fill: '#fff'
    },
    leftIcon: {
        transform: ['rotate(180deg) translateY(50%)']
    },
    rightIcon: {
        right: 0,
    }
};
