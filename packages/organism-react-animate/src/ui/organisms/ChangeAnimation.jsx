// @ts-check

import { useState, useRef, useEffect } from "react";
import { build, useLazyInject } from "react-atomic-molecule";
import CSSTransition from "../organisms/CSSTransition";
import { initAni, parseAniValue } from "../../aniUtil";
import { dataStatusKey } from "../../const";
import { InjectStyles } from "../../initAniStyle";

const injects = {};

/**
 * @typedef {object} ChangeAnimationProps
 * @property {string} [statusKey]
 * @property {function} [onEnd]
 * @property {string} [animation]
 * @property {import('react').ReactElement|string} children
 * @property {Object} [otherProps]
 */

/**
 * @param {ChangeAnimationProps} param
 * @returns {import('react').ReactElement}
 */
const ChangeAnimation = ({
  statusKey = dataStatusKey,
  onEnd = null,
  animation = null,
  children,
  ...otherProps
}) => {
  const defaultAniProps = { in: false };
  const [aniProps, setAniProps] = useState(defaultAniProps);
  const lastAnimation = useRef({ init: false, animation: null });
  injects[statusKey] = useLazyInject(
    InjectStyles({ statusKey }),
    injects[statusKey]
  );
  useEffect(() => {
    if ("" === animation) {
      lastAnimation.current.animation = null;
      setAniProps(defaultAniProps);
    } else {
      const aniData = parseAniValue(animation);
      initAni(aniData.key, aniData.name, aniData.timeout, () => {
        const thisAniProps = {
          in: true,
          appear: true,
          enter: true,
          exit: false,
          classNames: { appear: aniData.className, enter: aniData.className },
          timeout: { appear: aniData.timeout, enter: aniData.timeout },
          delay: { appear: aniData.delay, enter: aniData.delay },
        };
        if (lastAnimation.current.animation !== animation) {
          setTimeout(() => {
            lastAnimation.current = { init: true, animation };
            setAniProps(thisAniProps);
          });
        }
      });
    }
  }, [animation]);
  if (!lastAnimation.current.init) {
    return null;
  } else {
    return build(CSSTransition)(
      { addEndListener: onEnd, ...aniProps, ...otherProps },
      children
    );
  }
};

export default ChangeAnimation;
