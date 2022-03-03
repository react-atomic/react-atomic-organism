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
    isRunning[scrollKey] = false;
    callfunc(callback, [scrollNode]);
  };

  if (isRunning[scrollKey]) {
    isRunning[scrollKey] = false;
    setTimeout(() => {
      scrollNode[scrollKey] = to;
      cb();
    });
    return false;
  }
  if (!duration) {
    duration = 900;
  }
  const from = scrollNode[scrollKey];
  const go = to - from;
  if (!go) {
    return cb();
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
};

export default smoothScrollTo;
