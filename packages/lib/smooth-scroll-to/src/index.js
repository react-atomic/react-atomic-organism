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
      callfunc(callback, [{ scrollNode, from, to, go }]);
    }
  };
  const cancel = () => {
    isRunning[scrollKey] = false;
  };

  if (isRunning[scrollKey]) {
    setTimeout(() => {
      scrollNode[scrollKey] = to;
      cb();
    });
    return cancel;
  }
  if (!duration) {
    duration = 900;
  }
  const from = scrollNode[scrollKey];
  const go = to - from;
  if (!go) {
    return () => {};
  }
  aniTimer(
    {
      isContinue: (elapsedTime) => {
        if (isRunning[scrollKey]) {
          const progress = easeInOutCubic(elapsedTime, from, go, duration);
          scrollNode[scrollKey] = progress;
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
