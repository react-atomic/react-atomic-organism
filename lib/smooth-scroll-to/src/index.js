'use strict';

import { getScrollNode } from 'get-scroll-info';

const easeInOutCubic = function(t, b, c, d) {
    if ((t/=d/2) < 1) {
        return c/2*t*t*t + b
    }
    return c/2*((t-=2)*t*t + 2) + b
}

const smoothScrollTo = (to, duration, el) => {
    el = getScrollNode(el);
    if (!duration) {
        duration = 900;
    }
    let from = el.scrollTop;
    let go = to - from;
    if (0 >= go ) {
        return;
    }
    let beginTimeStamp;
    const scrollTo = (timeStamp) => {
        beginTimeStamp = beginTimeStamp || timeStamp;
        let elapsedTime = timeStamp - beginTimeStamp;
        let progress = easeInOutCubic(
            elapsedTime,
            from,
            go,
            duration
        );
        el.scrollTop = progress;
        elapsedTime < duration 
            && requestAnimationFrame(scrollTo);
    };
    requestAnimationFrame(scrollTo);
};

export default smoothScrollTo;
