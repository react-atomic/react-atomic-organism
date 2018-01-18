'use strict';

import { getScrollNode } from 'get-scroll-info';
import easeInOutCubic from 'easing-lib/easeInOutCubic';

let isRunning = false;

/**
 *  !!Important!! any logic change need take care isRunning
 */
const smoothScrollTo = (to, duration, el, callback) => {
    if (isRunning) {
        if ('function' === typeof callback) {
            callback();
        }
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
