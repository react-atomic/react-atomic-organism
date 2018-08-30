'use strict';

import { getScrollNode } from 'get-scroll-info';
import easeInOutCubic from 'easing-lib/easeInOutCubic';

let isRunning = false;

/**
 *  !!Important!! any logic change need take care isRunning
 */
const smoothScrollTo = (to, duration, el, callback) => {
    el = getScrollNode(el)
    if (isRunning) {
        isRunning = false
        setTimeout(() => {
            el.scrollTop = to
            if ('function' === typeof callback) {
                callback()
            }
        })
        return false;
    }
    if (!duration) {
        duration = 900;
    }
    const from = el.scrollTop;
    const go = to - from;
    if (!go) {
        isRunning = false;
        if ('function' === typeof callback) {
            callback();
        }
        return;
    }
    let beginTimeStamp;
    const scrollTo = (timeStamp) => {
        beginTimeStamp = beginTimeStamp || timeStamp;
        const elapsedTime = timeStamp - beginTimeStamp;
        const progress = easeInOutCubic(
            elapsedTime,
            from,
            go,
            duration
        );
        el.scrollTop = progress;
        if ( elapsedTime < duration && go && isRunning) { 
            requestAnimationFrame(scrollTo);
        } else {
            isRunning = false;
            if ('function' === typeof callback) {
                callback();
            }
        }
    }
    isRunning = true
    requestAnimationFrame(scrollTo);
};

export default smoothScrollTo;
