import React, {PureComponent} from 'react';
import Animate from 'organism-react-animate';
import {
    ScrollSpy,
    ScrollReceiver,
    scrollStore
} from 'organism-react-scroll-nav';

class Content extends PureComponent
{
    componentWillReceiveProps(nextProps)
    {
        const { once, targetInfo } = nextProps;
        const { isShown, targetId} =  targetInfo;
        if (once && isShown) {
            const node = scrollStore.getNode(targetId);
            if (node && !node.props.monitorScroll) {
                node.detach();
            }
        }
    }

    render()
    {
        const {
            children,
            appear,
            enter,
            leave,
            once,
            minHeight,
            targetInfo,
            style,
            refCb,
            id,
            monitorScroll,
            ...others
        } = this.props;
        let show = null;
        let thisStyle = {};
        if (targetInfo.isOnScreen) {
            if ('function' === typeof children) {
                show = children();
            } else {
                show = children;
            }
        }
        if (!show) {
            thisStyle = {
                minHeight: minHeight 
            };
        }
        return (
            <Animate
                {...others}
                style={{...thisStyle, ...style}}
                appear={appear}
                enter={enter}
                leave={leave}
                refCb={refCb}
                id={id}
            >
                {show}
            </Animate>
        );
    }
}

const ScrollAnimate = ({appear, enter, leave, once, minHeight, children, ...others}) => 
<ScrollSpy {...others}>
    <ScrollReceiver
        appear={appear}
        enter={enter}
        leave={leave}
        once={once}
        minHeight={minHeight}
    >
        {children}
    </ScrollReceiver>
</ScrollSpy>

ScrollAnimate.defaultProps = {
    container: <Content />,
    once: true,
    monitorScroll: false,
    minHeight: 155, //need great than browser minHeigh 150px
};
export default ScrollAnimate;
