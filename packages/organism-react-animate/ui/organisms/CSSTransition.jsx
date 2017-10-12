import React, {cloneElement}  from 'react';
import Transition from 'react-transition-group/Transition';
import {mixClass, removeClass} from 'class-lib';
import get from 'get-object-value';

const getEnterClass = (classList, isAppear) =>
{
    let classIndex = (isAppear) ? 'appear' : 'enter';
    return classList[classIndex];
}

const handleStart = (classList, handler, isExit, node, isAppear) =>
{
    if (node) {
        const thisClass = (isExit) ?
            get(classList, ['exit']) :
            getEnterClass(classList, isAppear);
        if (thisClass) {
            node.className = mixClass(
                node.className,
                thisClass
            );
        }
    }
    if (handler) {
        handler(node, isAppear);
    }
}

const handleFinish = (classList, handler, isExit, node, isAppear) =>
{
    if (node) {
        const thisClass = (isExit) ?
            get(classList, ['exit']) :
            getEnterClass(classList, isAppear);
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

const CSSTransition = ({classNames, ...props}) =>
      <Transition
        in={true}
        unmountOnExit={true}
        {...props}
        onEnter={handleStart.bind(this, classNames, props.onEnter, false)}
        onEntering={handleStart.bind(this, classNames, props.onEntering, false)}
        onEntered={handleFinish.bind(this, classNames, props.onEntered, false)}
        onExit={handleStart.bind(this, classNames, props.onExit, true)}
        onExiting={handleStart.bind(this, classNames, props.onExiting, true)}
        onExited={handleFinish.bind(this, classNames, props.onExited, true)}
      />

export default CSSTransition;
