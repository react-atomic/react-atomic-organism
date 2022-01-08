import { getScrollNode } from "get-scroll-info";
import callfunc from "call-func";
import { easeInOutCubic, aniTimer } from "easing-lib";

let isRunning = false;

/**
 *  !!Important!! any logic change need take care isRunning
 */
const smoothScrollTo = (to, duration, el, callback) => {
  const scrollNode = getScrollNode(el);
  const cb = () => {
    isRunning = false;
    callfunc(callback, [scrollNode]);
  };

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
    return cb();
  }
  aniTimer(
    {
      isContinue: (elapsedTime) => {
        const progress = easeInOutCubic(elapsedTime, from, go, duration);
        scrollNode.scrollTop = progress;
        if (isRunning) {
          return true;
        }
      },
      cancel: () => cb(),
      done: () => cb(),
    },
    duration
  );
  isRunning = true;
};

export default smoothScrollTo;
