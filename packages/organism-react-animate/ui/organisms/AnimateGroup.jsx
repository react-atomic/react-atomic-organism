import React, {useState, useEffect, useMemo} from 'react';
import {build, mixClass} from 'react-atomic-molecule';
import get from 'get-object-value';
import callfunc from 'call-func';
import CSSTransition from '../organisms/CSSTransition';
import getChildMapping from '../../src/getChildMapping';

const keys = Object.keys;

const getAniProps = (props, enterToAppear) => {
  const {
    timeout,
    delay,
    classNames,
    mountOnEnter,
    unmountOnExit,
    enter,
    exit,
    addEndListener,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
  } = props;
  let appear = props.appear;
  if (enterToAppear && classNames && classNames.enter) {
    classNames.appear = classNames.enter;
    delay.appear = delay.enter;
    timeout.appear = timeout.enter;
    appear = true;
  }
  /* not assign onExited, because call at handleExited */
  const aniProps = {
    timeout,
    delay,
    classNames,
    mountOnEnter,
    unmountOnExit,
    appear,
    enter,
    exit,
    addEndListener,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    in: props.in,
  };
  return aniProps;
};

const buildCSSTransition = build(CSSTransition);

const AnimateGroup = props => {
  const {className, component, lazy, onExited, style, ...otherProps} = props;
  const [children, setChildren] = useState();
  const aniProps = getAniProps(otherProps, true);
  keys(aniProps).forEach(key => delete otherProps[key]);
  useEffect(() => {
    let _isClean = false;
    let _exitTimeout;
    let _enterTimeout;
    const handleExited = child => node => {
      callfunc(onExited, [node]);
      if (_isClean) {
        return;
      }
      _exitTimeout = setTimeout(() =>
        setChildren(children => {
          delete children[child.key];
          return {...children};
        }),
      );
    };
    const prevChildMapping = children || {};
    const nextChildMapping = getChildMapping(
      otherProps.children,
      (child, key) =>
        buildCSSTransition(
          {
            ...child.props,
            ...aniProps,
            key: get(child, ['props', 'name'], key),
            onExited: handleExited(child),
          },
          child,
        ),
    );
    const allChildMapping = {...prevChildMapping, ...nextChildMapping};
    keys(allChildMapping).forEach(key => {
      const child = allChildMapping[key];
      const hasPrev = key in prevChildMapping;
      const hasNext = key in nextChildMapping;
      const prevChild = prevChildMapping[key];
      const isLeaving = !get(prevChild, ['props', 'in']);
      if (!hasNext && hasPrev) {
        // Will Exit
        if (!isLeaving) {
          allChildMapping[key] = build(child)({in: false});
        } else {
          delete allChildMapping[key];
        }
      }
    });
    if (!children) {
      _enterTimeout = setTimeout(() => setChildren(allChildMapping), lazy);
    } else {
      setChildren(allChildMapping);
    }
    return () => {
      clearTimeout(_exitTimeout);
      clearTimeout(_enterTimeout);
      _isClean = true;
    };
  }, [props]);
  return useMemo(() => {
    otherProps.style = {overflow: 'hidden', ...style};
    otherProps.className = mixClass(className, 'animate-group-container');
    return build(component)(
      otherProps,
      keys(children || {}).map(key => children[key]),
    );
  }, [children]);
};

AnimateGroup.defaultProps = {
  lazy: 150,
  component: 'div',
  unmountOnExit: true,
  in: true,
};

export default AnimateGroup;
