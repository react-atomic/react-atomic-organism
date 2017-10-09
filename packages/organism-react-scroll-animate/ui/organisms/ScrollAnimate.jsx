import React, {Component} from 'react';
import {SemanticUI} from 'react-atomic-molecule';
import Animate from 'organism-react-animate';
import {
    ScrollSpy,
    ScrollReceiver,
    scrollStore
} from 'organism-react-scroll-nav'

class Content extends Component
{
    
    shouldComponentUpdate(nextProps, nextState)
    {
        const { once, targetInfo } = this.props;
        const { isShown, targetId} =  targetInfo;
        let bool;
        let node;
        if (once && isShown) {
            node = scrollStore.getNode(targetId);
            if (node && !node.props.monitorScroll) {
                node.detach();
            }
            bool=false;
        } else {
            bool=true;
        }
        return bool;
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
        } else {
            show = React.cloneElement(
                show,
                others
            );
        }
        return (
            <Animate
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

const ScrollAnimate = (props) => { 
    const {appear, enter, leave, once, minHeight, children, ...others} = props;
    return ( 
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
    );
};
ScrollAnimate.defaultProps = {
    container: <Content />,
    once: true,
    monitorScroll: false,
    minHeight: 155, //need great than browser minHeigh 150px
};
export default ScrollAnimate;
