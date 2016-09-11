'use strict';

let lastScroll;

const isWebkit = 'undefined' !== typeof document.webkitIsFullScreen;
const docEl = document.documentElement;

const getScrollNode = (el) => {
    if (!el) {
        el = document.body; 
        if ('undefined' === typeof el.scrollLeft) {
            el = docEl;
        }
    }
    return el;
}

const getScrollInfo = (el, margin) => {
    el = getScrollNode(el);
    if (!margin) {
        margin = 50;
    }
    let h;
    let w;
    const isBody = el.nodeName && 'body' === el.nodeName.toLowerCase();
    if (isWebkit && isBody) {
        h = window.innerHeight;
        w = window.innerWidth;
    } else {
        h = el.clientHeight;
        w = el.clientWidth;
    }
    const scrollLeft = el.scrollLeft;
    const scrollHeight = el.scrollHeight;
    const scrollTop = el.scrollTop;
    const scrollWidth = el.scrollWidth;
    const scrollBottom = scrollTop + h;
    const scrollRight = scrollLeft + w;

    const info = {
        atTop   : scrollTop < margin,
        atRight : scrollRight > (scrollWidth - margin),
        atBottom: scrollBottom > (scrollHeight - margin),
        atLeft  : scrollLeft < margin,

        isScrollDown : lastScroll && scrollTop > lastScroll.top,
        isScrollLeft : lastScroll && scrollLeft < lastScroll.left,
        isScrollRight: lastScroll && scrollLeft > lastScroll.left,
        isScrollUp   : lastScroll && scrollTop < lastScroll.top,

        scrollWidth : scrollWidth,
        scrollHeight: scrollHeight,

        top   : scrollTop,
        right : scrollRight,
        bottom: scrollBottom,
        left  : scrollLeft,
    };
    lastScroll = info;
    return info;
};

export default getScrollInfo;
export { getScrollNode };
