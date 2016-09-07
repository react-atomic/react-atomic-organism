'use strict';

let lastScroll;

const isWebkit = 'undefined' !== typeof document.webkitIsFullScreen;

const getScrollInfo = (el, margin)=> {
    const docEl = document.documentElement;
    if (!el) {
        el = document.body; 
        if ('undefined' === typeof el.scrollLeft) {
            el = docEl;
        }
    }
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
        atTop: scrollTop < margin,
        atRight : scrollRight > (scrollWidth - margin),
        atBottom: scrollBottom > (scrollHeight - margin),
        atLeft: scrollLeft < margin,

        isScrollDown : lastScroll && scrollTop > lastScroll.scrollTop,
        isScrollLeft : lastScroll && scrollLeft < lastScroll.scrollLeft,
        isScrollRight: lastScroll && scrollLeft > lastScroll.scrollLeft,
        isScrollUp   : lastScroll && scrollTop < lastScroll.scrollTop,

        scrollBottom: scrollBottom,
        scrollHeight: scrollHeight,
        scrollLeft  : scrollLeft,
        scrollRight : scrollRight,
        scrollTop   : scrollTop,
        scrollWidth : scrollWidth,
    };
    lastScroll = info;
    return info;
};

export default getScrollInfo;
