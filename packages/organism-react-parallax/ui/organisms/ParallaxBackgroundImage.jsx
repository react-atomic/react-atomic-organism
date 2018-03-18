import React, {Component} from 'react';
import {
    scrollDispatch,
    scrollStore,
    ScrollSpy,
    ScrollReceiver,
} from 'organism-react-scroll-nav';
import {reactStyle, SemanticUI} from 'react-atomic-molecule';
import getScrollInfo from 'get-scroll-info';
import getOffset from 'getoffset';
import get from 'get-object-value';
import merge from 'array.merge';
import easeInOutQuad from 'easing-lib/easeOutQuint';
scrollDispatch({scrollDelay: 0});

class Content extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            posY: 0
        };
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        const {
            targetInfo,
        } = nextProps;
        if (!targetInfo.isOnScreen) {
            this.scrollInfo = null;
            return false;
        } else {
            return true;
        }
    }

    calOffset(el, props)
    {
        if (!props) {
            props = this.props;
        }
        const {speed, targetInfo} = props; 
        const scrollInfo = this.scrollInfo; 
        const winW = get(scrollInfo, ['scrollNodeWidth'], 0);
        const winH = get(scrollInfo, ['scrollNodeHeight'], 0);
        const winTop = get(scrollInfo, ['top'], 0);
        let offset;
        if (targetInfo.targetId) {
           offset = scrollStore.getOffset(targetInfo.targetId); 
        } else {
            if (el) {
                offset = getOffset(el);
            } else {
                return;
            }
        }
        const elViewTop = get(offset, ['top'], 0) - winTop;
        const elH = get(offset, ['h']);
        const scrollDist = (speed * (elH + winH)) / 2;
        const resultH = elH + Math.abs(winH - elH) * (1 - speed);
        const viewCenter = 1 - 2 * (winH - elViewTop) / (winH + elH);
        const posY = (scrollDist * viewCenter) - elViewTop;
        return {posY, resultH};
    }

    handleResize = () =>
    {
        const scrollInfo = getScrollInfo();
        this.scrollInfo = scrollInfo;
        const winW = get(scrollInfo, ['scrollNodeWidth'], 0);
        const winH = get(scrollInfo, ['scrollNodeHeight'], 0);
        const {posY, resultH} = this.calOffset(this.el);
        this.setState(()=>{return {
            winW,
            winH,
            posY,
            resultH
        }});
    }

    handleScroll = (nextProps) =>
    {
	if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
	}
        const {targetInfo} = nextProps;
        if (!targetInfo.isOnScreen) {
	    return;
	}
        const {posY, resultH} = this.calOffset(null, nextProps);
        if (this.isRun) {
            this.scrollTimer = setTimeout(()=>{
                this.handleScroll(nextProps); 
            },150); 
            return;
        }
        this.handleScrollAni(posY, this.lastY, resultH);
        this.lastY = posY;
    }


    handleScrollAni = (lastY, oldLastY, resultH) =>
    {
	if (this.aniTimer) {
            clearTimeout(this.aniTimer);
	}
	if (this.isRun) {
	    this.aniTimer = setTimeout(()=>{
		this.handleScrollAni(lastY, oldLastY);
	    }, 150);
	    return;
	}
	let beginTimeStamp = null;
        oldLastY = oldLastY || 0;
	const go = lastY - oldLastY;
	const duration = 350;
	const runScrollAni = (timeStamp) =>
	{
	    this.isRun = true;
	    if (!beginTimeStamp) {
		beginTimeStamp = timeStamp;
	    }
	    const elapsedTime = timeStamp - beginTimeStamp;
	    const progress = easeInOutQuad(
		elapsedTime,
		oldLastY,
		go,
		duration
	    );
	    this.setState({posY: progress, resultH});
	    if ( elapsedTime < duration ) {
	    	requestAnimationFrame(runScrollAni);
	    } else {
		this.isRun = false;
	    }
	}
	requestAnimationFrame(runScrollAni);
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
        const scrollInfo = getScrollInfo();
        if ( !this.scrollInfo || 
            this.scrollInfo.top !== scrollInfo.top ) {
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
        const {
            posY,
            resultH,
            winW,
            winH
        } = this.state;
        let height = resultH;
        if (!height) {
            height = winH;
        }
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
                    styles={reactStyle({
                        ...Styles.background,
                    }, false, false)}
                >
                    <SemanticUI className="parllax-layer"
                        styles={reactStyle({
                            ...Styles.backgroundLayer,
                            transform: [`translate3d(0%, ${posY}px, 0px)`],
                        },false,false)}
                    >
                        <SemanticUI className="parllax-image"
                            styles={reactStyle({
                                ...Styles.backgroundImage,
                                //backgroundSize: `${winW}px ${height}px`,
                                backgroundSize: `cover`,
                                backgroundImage: 'url("'+backgroundImage+'")',
                                width: winW,
                                height
                            }, false, false)}
                        />
                    </SemanticUI>
                </SemanticUI>
            </SemanticUI>
        );
    }
}

const ParallaxBackgroundImage = props =>
<ScrollSpy {...props}>
    <ScrollReceiver />
</ScrollSpy>

ParallaxBackgroundImage.defaultProps = {
    container: <Content />,
    speed: 0.6,
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
    },
    backgroundLayer: {
        position: 'relative',
        willChange: 'transform, opacity'
    },
    backgroundImage: {
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
    }
};
