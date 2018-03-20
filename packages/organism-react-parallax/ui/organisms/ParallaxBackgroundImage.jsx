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
    calOffset(el, props)
    {
        if (!props) {
            props = this.props;
        }
        const {speed, targetInfo} = props; 
        const scrollInfo = this.scrollInfo; 
        const winH = get(scrollInfo, ['scrollNodeHeight'], 0);
        const winTop = get(scrollInfo, ['top'], 0);
        let offset;
        if (el) {
            offset = getOffset(el);
        } else {
            offset = targetInfo;
        }
        if (!offset) {
            return;
        }
        const elViewTop = get(offset, ['top'], 0) - winTop;
        const elH = get(offset, ['h']);
        const scrollDist = (speed * (elH + winH)) / 2;
        const viewCenter = 1 - 2 * (winH - elViewTop) / (winH + elH);
        const posY = Math.round((scrollDist * viewCenter) - elViewTop);
        return {posY};
    }

    handleScroll = nextProps =>
    {
        const {targetInfo} = nextProps;
        if (!targetInfo.isOnScreen) {
	    return;
	}
        const {posY} = get(this.calOffset(null, nextProps), null, {});
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
        const {posY} = this.calOffset(this.el);
        this.setState(()=>{return { posY }});
    }

    constructor(props)
    {
        super(props);
        this.state = {
            posY: 0
        };
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        const { targetInfo, } = nextProps;
        const { posY } = nextState;
        if (posY === this.state.posY) {
            return false;
        }
        if (!targetInfo.isOnScreen) {
            return false;
        } else {
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

    componentWillReceiveProps(next)
    {
        const scrollInfo = get(next, ['targetInfo', 'scrollInfo']);
        if ( !this.scrollInfo || 
            this.scrollInfo.top !== scrollInfo.top
        ) {
             this.scrollInfo = scrollInfo;
             this.handleScroll(next);
        }
    }

    render()
    {
        const {
            style,
            styles,
            children,
            targetInfo,
            backgroundImage,
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
                    <SemanticUI className="parllax-layer"
                        styles={reactStyle({
                            ...Styles.backgroundLayer,
                            transform: [`translate3d(0%, ${posY}px, 0px)`],
                        },false,false)}
                    >
                        <SemanticUI className="parllax-image"
                            style={{
                                ...Styles.backgroundImage,
                                backgroundImage: 'url("'+backgroundImage+'")',
                            }}
                        />
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
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        willChange: 'scroll-position',
    },
    backgroundLayer: {
        position: 'relative',
        willChange: 'transform, opacity'
    },
    backgroundImage: {
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        willChange: 'scroll-position',
    }
};
