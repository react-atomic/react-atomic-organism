import { getScrollNode } from "get-scroll-info";
import callfunc from "call-func";
import { easeInOutCubic, aniTimer } from "easing-lib";

const isRunning = [];

/**
 *  !!Important!! any logic change need take care isRunning
 */
const smoothScrollTo = (to, duration, el, callback, scrollKey) => {
  scrollKey = scrollKey || "scrollTop";
  const scrollNode = getScrollNode(el);
  const cb = () => {
    if (isRunning[scrollKey]) {
      isRunning[scrollKey] = false;
      callfunc(callback, [scrollNode]);
    }
  };
  const cancel = () => {
    isRunning[scrollKey] = false;
  };

  if (isRunning[scrollKey]) {
    setTimeout(() => {
      scrollNode[scrollKey] = to;
      cb();
    }, 50);
    return cancel;
  }
  if (!duration) {
    duration = 900;
  }
  const from = scrollNode[scrollKey];
  const go = to - from;
  if (!go) {
    isRunning[scrollKey] = true;
    cb();
    return () => {};
  }
  aniTimer(
    {
      isContinue: (elapsedTime) => {
        const progress = easeInOutCubic(elapsedTime, from, go, duration);
        scrollNode[scrollKey] = progress;
        if (isRunning[scrollKey]) {
          return true;
        }
      },
      cancel: () => cb(),
      done: () => cb(),
    },
    duration
  );
  isRunning[scrollKey] = true;
  return cancel;
};

export default smoothScrollTo;
