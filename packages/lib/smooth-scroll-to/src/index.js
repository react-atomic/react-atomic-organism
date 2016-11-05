'use strict';

import { getScrollNode } from 'get-scroll-info';

let isRunning = false;

const easeInOutCubic = function(t, b, c, d) {
    if ((t/=d/2) < 1) {
        return c/2*t*t*t + b
    }
    return c/2*((t-=2)*t*t + 2) + b
}

const smoothScrollTo = (to, duration, el, callback) => {
    if (isRunning) {
        return false;
    } else {
        isRunning = true;
    }
    el = getScrollNode(el);
    if (!duration) {
        duration = 900;
    }
    const from = el.scrollTop;
    const go = to - from;
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
        if ( elapsedTime < duration && go) { 
            requestAnimationFrame(scrollTo);
        } else {
            isRunning = false;
            if ('function' === typeof callback) {
                callback();
            }
        }
    };
    requestAnimationFrame(scrollTo);
};

export default smoothScrollTo;
