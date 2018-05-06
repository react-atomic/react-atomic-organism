import React, {Component} from 'react';
import { ScrollInfo } from 'organism-react-scroll-nav';
import {reactStyle, SemanticUI} from 'react-atomic-molecule';
import getScrollInfo from 'get-scroll-info';
import getOffset from 'getoffset';
import get from 'get-object-value';
import merge from 'array.merge';
import aniCal from 'easing-lib/easeOutQuart';

class Content extends Component
{
    state = {
        posY: 0
    };

    calOffset(el, props)
    {
        if (!props) {
            props = this.props;
        }
        const {speed, targetInfo} = props; 
        let offset;
        if (el) {
            offset = getOffset(el);
        } else {
            offset = targetInfo;
        }
        if (!offset) {
            return;
        }
        const scrollInfo = this.scrollInfo; 
        const winH = get(scrollInfo, ['scrollNodeHeight'], 0);
        const winTop = get(scrollInfo, ['top'], 0);
        const elViewTop = get(offset, ['top'], 0) - winTop;
        const elH = get(offset, ['h']);
        const scrollDist = (speed * (elH + winH)) / 2;
        const viewCenter = 1 - 2 * (winH - elViewTop) / (winH + elH);
        const posY = -Math.round((scrollDist * viewCenter) - elViewTop);
        return {posY};
    }

    handleScroll = props =>
    {
        const {targetInfo} = props;
        if (!targetInfo.isOnScreen) {
	    return;
	}
        const {posY} = get(this.calOffset(null, props), null, {});
        if (!posY) {
            return;
        }
        this.posY = posY;
        this.handleScrollAni(posY);
    }

    handleScrollAni = () =>
    {
	let beginTimeStamp = 0;
	const runScrollAni = timeStamp =>
	{
            beginTimeStamp = beginTimeStamp || timeStamp;
	    const elapsedTime = timeStamp - beginTimeStamp;
            this.setState(({posY})=>{
                const go = this.posY - posY;
                const duration = 1000;
		let progress = aniCal (
		    elapsedTime,
		    this.posY,
		    go,
                    duration 
		);
                progress = Math.round(progress);
                if ( elapsedTime < duration && progress !== this.posY) {
                    requestAnimationFrame(runScrollAni);
                }
		return { posY: progress };
	    });
	}
	requestAnimationFrame(runScrollAni);
    }

    handleResize = () =>
    {
        this.scrollInfo = getScrollInfo();
        this.setState(this.calOffset(this.el));
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        const { targetInfo } = nextProps;
        const {isOnScreen, scrollTop} = targetInfo;
        if (!isOnScreen) {
            return false;
        } else {
            if (scrollTop !== get(this.props, ['targetInfo', 'scrollTop'])) {
                return true;
            }
            const { posY } = nextState;
            if (posY === this.state.posY) {
                return false;
            }
            return true;
        }
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    componentWillUnmount()
    {
	if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
	}
	if (this.aniTimer) {
            clearTimeout(this.aniTimer);
	}
        window.removeEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const props = this.props;
        const scrollInfo = get(props, ['targetInfo', 'scrollInfo']);
        if ( !this.scrollInfo || 
            this.scrollInfo.top !== scrollInfo.top
        ) {
             this.scrollInfo = scrollInfo;
             this.handleScroll(props);
        }
    }

    render()
    {
        const {
            style,
            styles,
            children,
            targetInfo,
            background,
            speed,
            refCb,
            ...others
        } = this.props;
        const { posY } = this.state;
        return (
            <SemanticUI
                {...others}
                refCb={ el => {refCb(el);this.el = el;}}
                styles={merge(
                    reactStyle({
                        ...Styles.content,
                        ...style,
                    }, false, false),
                    styles
                )}
            >
                {children}
                <SemanticUI
                    className="parllax-background"
                    style={Styles.background}
                >
                    <SemanticUI
                        className="parllax-layer"
                        styles={reactStyle({
                            ...Styles.backgroundLayer,
                            transform: [`translate3d(0, ${posY}px, 0)`],
                        },false,false)}
                    >
                        {background}
                    </SemanticUI>
                </SemanticUI>
            </SemanticUI>
        );
    }
}

const ParallaxBackgroundImage = props => <ScrollInfo {...props} />;

ParallaxBackgroundImage.defaultProps = {
    container: <Content />,
    noDelay: true,
    speed: 0.5,
};

export default ParallaxBackgroundImage;

const Styles = {
    content: {
        overflow: 'hidden',
        position: 'relative',
        zIndex: 0
    },
    background: {
        position: 'absolute',
        top: '-60%',
        left: 0,
        zIndex: -1,
        willChange: 'scroll-position',
    },
    backgroundLayer: {
        position: 'relative',
        willChange: 'transform, opacity'
    },
};
