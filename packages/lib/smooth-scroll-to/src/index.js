import { getScrollNode } from "get-scroll-info";
import callfunc from "call-func";
import { easeInOutCubic, aniTimer } from "easing-lib";
import { NEW_OBJ } from "reshow-constant";

const isRunning = NEW_OBJ();

/**
 *  !!Important!! any logic change need take care isRunning
 */
const smoothScrollTo = (to, duration, el, callback, scrollKey) => {
  scrollKey = scrollKey || "scrollTop";
  const scrollNode = getScrollNode(el);

  const cb = () => {
    if (isRunning[scrollKey]) {
      callfunc(callback, [{ scrollNode, from, to, go }]);
      isRunning[scrollKey] = false;
    }
  };

  const cancel = () => {
    clearTimeout(isRunning[scrollKey]);
    isRunning[scrollKey] = false;
  };

  if (isRunning[scrollKey]) {
    clearTimeout(isRunning[scrollKey]);
    isRunning[scrollKey] = setTimeout(() => {
      scrollNode[scrollKey] = to;
      cb();
    });
    return cancel;
  }
  if (null == duration) {
    duration = 500;
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
