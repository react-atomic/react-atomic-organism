import React, {Component} from 'react';
import {SemanticUI, assign} from 'react-atomic-molecule';
import Animate from 'organism-react-animate';
import {
    ScrollSpy,
    ScrollReceiver,
    scrollDispatch   
} from 'organism-react-scroll-nav'

scrollDispatch({scrollMargin:0});


const Content = (props) => {
    const {
        active,
        isOnScreen,
        children,
        enter,
        leave,
        ...others 
    } = props;
    let show = null;
    if (isOnScreen) {
        show = <SemanticUI>{children}</SemanticUI>;
    }
    return (
        <Animate 
            enter={enter}
            appear={enter}
            leave={leave}
        >
            {show}
        </Animate>
    );
};

const ScrollAnimate = (props) => { 
    const {enter, leave, children, ...others} = props;
    return ( 
        <ScrollSpy {...others}>
            <ScrollReceiver container={
                <Content enter={enter} leave={leave}>
                    {children}
                </Content>
            }/>
        </ScrollSpy>
    );
};

export default ScrollAnimate;
