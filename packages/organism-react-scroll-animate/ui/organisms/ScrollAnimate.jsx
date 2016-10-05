import React from 'react';
import {SemanticUI, assign} from 'react-atomic-molecule';
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
        scrollInfo
    } = props;
    let show = null;
    let style = null;
    let force = false;
    if (once && scrollInfo.isShown) {
        const node = scrollStore.getNode(scrollInfo.targetId);
        if (node) {
            node.detach();
        }
        force = true;
    }
    if (scrollInfo.isOnScreen || force) {
        if (React.isValidElement(children)) {
            show = children;
        } else if ('function' === typeof children) {
            show = children();
        } else {
            show = <SemanticUI>{children}</SemanticUI>;
        }
    }
    if (!show) {
        style = {
            visibility: 'hidden',
            minHeight: '100px'
        };
    }
    return (
        <Animate style={style} enter={enter} leave={leave}>
            {show}
        </Animate>
    );
};

const ScrollAnimate = (props) => { 
    const {enter, leave, once, children, ...others} = props;
    return ( 
        <ScrollSpy {...others} testScrollTo={false}>
            <ScrollReceiver
                container={<Content />}
                enter={enter}
                leave={leave}
                once={once}
            >
                {children}
            </ScrollReceiver>
        </ScrollSpy>
    );
};

export default ScrollAnimate;
