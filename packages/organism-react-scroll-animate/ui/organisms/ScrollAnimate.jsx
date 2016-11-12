import React from 'react';
import {assign, SemanticUI} from 'react-atomic-molecule';
import Animate from 'organism-react-animate';
import {
    ScrollSpy,
    ScrollReceiver,
    scrollStore
} from 'organism-react-scroll-nav'

const Content = (props) => {
    const {
        children,
        enter,
        leave,
        once,
        minHeight,
        targetInfo,
        style,
        ...others
    } = props;
    let show = null;
    let thisStyle = {};
    let force = false;
    if (once && targetInfo.isShown) {
        const node = scrollStore.getNode(targetInfo.targetId);
        if (node && !node.props.testScrollTo) {
            node.detach();
        }
        force = true;
    }
    if (targetInfo.isOnScreen || force) {
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
        <Animate style={assign(thisStyle,style)} enter={enter} leave={leave} {...others}>
            {show}
        </Animate>
    );
};

const ScrollAnimate = (props) => { 
    const {enter, leave, once, minHeight, children, ...others} = props;
    return ( 
        <ScrollSpy {...others} container={<Content />}>
            <ScrollReceiver
                enter={enter}
                leave={leave}
                once={once}
                minHeight={minHeight}
            >
                {children}
            </ScrollReceiver>
        </ScrollSpy>
    );
};
ScrollAnimate.defaultProps = {
    once: true,
    testScrollTo: false,
    minHeight: 155, //need great than browser minHeigh 150px
};
export default ScrollAnimate;
