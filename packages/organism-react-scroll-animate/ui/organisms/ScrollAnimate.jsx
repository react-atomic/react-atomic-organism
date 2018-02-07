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
        if (once && this.isShown) {
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
            isKeep,
            minHeight,
            targetInfo,
            style,
            monitorScroll,
            onEntered,
            ...others
        } = this.props;
        const { isShown, isOnScreen} =  targetInfo;
        let el = null;
        let thisStyle = {};
        if (isOnScreen ||
            (once && isShown) ||
            isKeep
        ) {
            if ('function' === typeof children) {
                el = children();
            } else {
                el = children;
            }
        }
        if (!el) {
            thisStyle.minHeight= minHeight;
        }
        let isIn = true;
        if ((el && !isShown) ||
            (!once && !isOnScreen)
        ) {
            isIn = false;
        }
        let thisOnEntered = onEntered;
        if (once) {
            thisOnEntered = (node, isAppear)=>{
                if (onEntered) {
                    onEntered(node, isAppear);
                }
                this.isShown = true;
            };
        }
        return (
            <Animate
                {...others}
                style={{...thisStyle, ...style}}
                appear={appear}
                enter={enter}
                leave={leave}
                onEntered={thisOnEntered}
                in={isIn}
            >
                {el}
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
    isKeep: false,
    once: true,
    monitorScroll: false,
    minHeight: 155, //need great than browser minHeigh 150px
};
export default ScrollAnimate;
