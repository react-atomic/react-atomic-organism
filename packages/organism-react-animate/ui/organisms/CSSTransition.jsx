import React, {cloneElement}  from 'react';
import Transition from 'react-transition-group/Transition';
import {mixClass, removeClass} from 'class-lib';
import get from 'get-object-value';

const getValue = (arr, isAppear, isExit) =>
{
    const index = (isExit) ? 'exit' : (
        (isAppear) ? 'appear' : 'enter'
    )
    return get(arr, [index]);
}

const handleStart = (classList, handler, delay, isExit, node, isAppear) =>
{
    if (!node || !node.style) {
        return;
    }
    let thisDelay = getValue(delay, isAppear, isExit);
    if (!thisDelay) {
        thisDelay = 0;
    }
    if (!isExit) {
        node.style.visibility='hidden';
    }
    setTimeout( () => {
        if (!isExit) {
            node.style.visibility='inherit';
        }
        const thisClass = getValue(classList, isAppear, isExit);
        if (thisClass) {
            node.className = mixClass(
                node.className,
                thisClass
            );
        }
        if (handler) {
            handler(node, isAppear);
        }
    }, thisDelay);
}

const handleFinish = (classList, handler, isExit, node, isAppear) =>
{
    if (node) {
        const thisClass = getValue(classList, isAppear, isExit);
        if (thisClass) {
            node.className = removeClass(
                node.className,
                thisClass
            );
        }
    }
    if (handler) {
        handler(node, isAppear);
    }
}

const CSSTransition = ({classNames, delay, ...props}) =>
      <Transition
        in={true}
        unmountOnExit={true}
        {...props}
        onEnter={handleStart.bind(this, classNames, props.onEnter, delay, false)}
        onEntering={handleStart.bind(this, classNames, props.onEntering, delay, false)}
        onEntered={handleFinish.bind(this, classNames, props.onEntered, false)}
        onExit={handleStart.bind(this, classNames, props.onExit, delay, true)}
        onExiting={handleStart.bind(this, classNames, props.onExiting, delay, true)}
        onExited={handleFinish.bind(this, classNames, props.onExited, true)}
      />

export default CSSTransition;
