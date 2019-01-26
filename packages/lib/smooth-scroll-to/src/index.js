import {getScrollNode} from 'get-scroll-info';
import easeInOutCubic from 'easing-lib/easeInOutCubic';

let isRunning = false;

const call = func => ('function' === typeof func ? func : () => {});

/**
 *  !!Important!! any logic change need take care isRunning
 */
const smoothScrollTo = (to, duration, el, callback) => {
  const scrollNode = getScrollNode(el);
  if (isRunning) {
    isRunning = false;
    setTimeout(() => {
      scrollNode.scrollTop = to;
      call(callback)(scrollNode);
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
    call(callback)(scrollNode);
    return;
  }
  let beginTimeStamp;
  const scrollTo = timeStamp => {
    beginTimeStamp = beginTimeStamp || timeStamp;
    const elapsedTime = timeStamp - beginTimeStamp;
    const progress = easeInOutCubic(elapsedTime, from, go, duration);
    scrollNode.scrollTop = progress;
    if (elapsedTime < duration && go && isRunning) {
      requestAnimationFrame(scrollTo);
    } else {
      isRunning = false;
      call(callback)(scrollNode);
    }
  };
  isRunning = true;
  requestAnimationFrame(scrollTo);
};

export default smoothScrollTo;
