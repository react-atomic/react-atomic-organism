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
        const {
            once,
            targetInfo
        } = this.props; 
        let bool;
        let node;
        if (once && targetInfo.isShown) {
            node = scrollStore.getNode(targetInfo.targetId);
            if (node && !node.props.testScrollTo) {
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
            enter,
            leave,
            once,
            minHeight,
            targetInfo,
            style,
            refCb,
            ref,
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
            <Animate style={{...thisStyle, ...style}} enter={enter} leave={leave} ref={ref} refCb={refCb}>
                {show}
            </Animate>
        );
    }
}

const ScrollAnimate = (props) => { 
    const {enter, leave, once, minHeight, children, ...others} = props;
    return ( 
        <ScrollSpy {...others}>
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
    container: <Content />,
    once: true,
    testScrollTo: false,
    minHeight: 155, //need great than browser minHeigh 150px
};
export default ScrollAnimate;
