import React, {Component} from 'react';
import {
    scrollStore,
    ScrollSpy,
    ScrollReceiver,
} from 'organism-react-scroll-nav';
import {reactStyle, SemanticUI} from 'react-atomic-molecule';
import getScrollInfo from 'get-scroll-info';
import getOffset from 'getoffset';
import get from 'get-object-value';
import easeOutQuint from 'easing-lib/easeOutQuint';

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
	    if (nextState.posY &&
		nextState.posY === this.state.posY &&
		nextState.lastY === this.state.lastY
	    ) {
		return false;
	    }
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
        let resultH = elH;
        let scrollDist;
        if (speed < 0) {
            scrollDist = speed * Math.max(elH, winH);
        } else {
            scrollDist = speed * (elH + winH);
        }
        scrollDist /= 2;
        const viewCenter = 1 - 2 * (winH - elViewTop) / (winH + elH);
        const posY = (scrollDist * viewCenter) - elViewTop;
        return posY;
    }

    handleResize = () =>
    {
        const scrollInfo = getScrollInfo();
        this.scrollInfo = scrollInfo;
        const winW = get(scrollInfo, ['scrollNodeWidth'], 0);
        const winH = get(scrollInfo, ['scrollNodeHeight'], 0);
        const posY = this.calOffset(this.el);
        this.setState(()=>{return {
            winW,
            winH,
            posY
        }});
    }

    handleScroll = (nextProps) =>
    {
	if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
	}
        const lastY = this.calOffset(null, nextProps);
        this.setState((old)=>{
            if (this.isRun) {
                this.scrollTimer = setTimeout(()=>{
                    this.handleScroll(nextProps); 
                },150); 
                return {};
            }
            return {lastY};
        });
    }


    handleScrollAni = (prevProps, prevState) =>
    {
	if (this.aniTimer) {
            clearTimeout(this.aniTimer);
	}
	if (this.isRun) {
	    this.aniTimer = setTimeout(()=>{
		this.handleScrollAni(prevProps, prevState);
	    }, 150);
	    return;
	}
	let beginTimeStamp = null;
	const {lastY, posY} = this.state;
	const go = lastY - prevState.lastY;
	const duration = 300; 
	const runScrollAni = (timeStamp) =>
	{
	    this.isRun = true;
	    if (!beginTimeStamp) {
		beginTimeStamp = timeStamp;
	    }
	    const elapsedTime = timeStamp - beginTimeStamp;
	    const progress = easeOutQuint(
		elapsedTime,
		prevState.lastY,
		go,
		duration
	    );
	    this.setState({posY: progress});
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

    componentDidUpdate(prevProps, prevState)
    {
	this.handleScrollAni(prevProps, prevState);
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
            children,
            targetInfo,
            backgroundImage,
            speed,
            refCb,
            ...others
        } = this.props;
        const {
            posY,
            winW,
            winH
        } = this.state;
        return (
            <SemanticUI
                {...others}
                refCb={ el => {refCb(el);this.el = el;}}
                styles={reactStyle({
                    ...Styles.content,
                }, false, false)}
            >
                <SemanticUI
                    className="parllax-background"
                    styles={reactStyle({
                        ...Styles.background,
                    }, false, false)}
                >
                    <SemanticUI className="parllax-image"
                        styles={reactStyle({
                            ...Styles.backgroundImage,
                            backgroundSize: `${winW}px ${winH}px`,
                            backgroundImage: 'url("'+backgroundImage+'")',
                            transform: [`translate3d(0px, ${posY}px, 0px)`],
                            width: winW,
                            height: winH
                        }, false, false)}
                    />
                </SemanticUI>
            </SemanticUI>
        );
    }
}

const ParallaxBackgroundImage = ({children, ...others}) =>
<ScrollSpy {...others}>
    <ScrollReceiver>
        {children}
    </ScrollReceiver>
</ScrollSpy>

ParallaxBackgroundImage.defaultProps = {
    container: <Content />,
    speed: 0.5,
};

export default ParallaxBackgroundImage;

const Styles = {
    content: {
        minHeight: 300,
        overflow: 'hidden'
    },
    background: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    backgroundImage: {
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        willChange: 'transform, opacity'
    }
};
