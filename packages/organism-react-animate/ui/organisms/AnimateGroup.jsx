import React, {createElement}  from 'react';
import CSSTransition from '../organisms/CSSTransition';

const AnimateGroup = ({
    children,
    component,
    timeout,
    classNames,
    appear,
    enter,
    exit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    addEndListener,
    ...props
}) =>
{
    let childrens = [];
    const aniProps = {
        addEndListener: addEndListener,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited,
        timeout: timeout,
        classNames: classNames,
        appear: appear,
        enter: enter,
        exit: exit,
        in: props.in
    };
    delete props.in;
    if (!children) {
        /*do nothing*/
    } else if (React.Children.only(children)) {
        childrens.push(createElement(
            CSSTransition,
            {...aniProps, ...children.props, key:0},
            children
        ));
    } else {
        React.Children.forEach(children, (child, i)=>{
            childrens.push(createElement(
                CSSTransition,
                {...aniProps, ...child.props, key:i},
                child
            ));
        });
    }
    return createElement(
        component,
        props,
        childrens
    ); 
}
export default AnimateGroup;
