import { getScrollNode } from "get-scroll-info";
import { easeInOutCubic, EasingProcessor } from "easing-lib/easeInOutCubic";

let isRunning = false;

const _call = (func, scrollNode) => () => {
  if ("function" !== typeof func) {
    return;
  }
  func(scrollNode);
};

/**
 *  !!Important!! any logic change need take care isRunning
 */
const smoothScrollTo = (to, duration, el, callback) => {
  const scrollNode = getScrollNode(el);
  const cb = _call(callback, scrollNode);
  if (isRunning) {
    isRunning = false;
    setTimeout(() => {
      scrollNode.scrollTop = to;
      cb();
    });
    return false;
  }
  if (!duration) {
    duration = 900;
  }
  const from = scrollNode.scrollTop;
  const go = to - from;
  if (!go) {
    isRunning = false;
    cb();
    return;
  }
  EasingProcessor({
    duration,
    isContinue: (elapsedTime) => {
      const progress = easeInOutCubic(elapsedTime, from, go, duration);
      scrollNode.scrollTop = progress;
      if (isRunning) {
          return true;
      }
    },
    cancel: () => isRunning = false,
    stop: () => isRunning = false
  });
  isRunning = true;
};

export default smoothScrollTo;
