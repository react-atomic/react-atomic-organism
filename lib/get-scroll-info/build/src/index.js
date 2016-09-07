'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var lastScroll = void 0;

var isWebkit = 'undefined' !== typeof document.webkitIsFullScreen;

var getScrollInfo = function getScrollInfo(el, margin) {
    var docEl = document.documentElement;
    if (!el) {
        el = document.body;
        if ('undefined' === typeof el.scrollLeft) {
            el = docEl;
        }
    }
    if (!margin) {
        margin = 50;
    }
    var h = void 0;
    var w = void 0;
    var isBody = el.nodeName && 'body' === el.nodeName.toLowerCase();
    if (isWebkit && isBody) {
        h = window.innerHeight;
        w = window.innerWidth;
    } else {
        h = el.clientHeight;
        w = el.clientWidth;
    }
    var scrollLeft = el.scrollLeft;
    var scrollHeight = el.scrollHeight;
    var scrollTop = el.scrollTop;
    var scrollWidth = el.scrollWidth;
    var scrollBottom = scrollTop + h;
    var scrollRight = scrollLeft + w;

    var info = {
        atTop: scrollTop < margin,
        atRight: scrollRight > scrollWidth - margin,
        atBottom: scrollBottom > scrollHeight - margin,
        atLeft: scrollLeft < margin,

        isScrollDown: lastScroll && scrollTop > lastScroll.scrollTop,
        isScrollLeft: lastScroll && scrollLeft < lastScroll.scrollLeft,
        isScrollRight: lastScroll && scrollLeft > lastScroll.scrollLeft,
        isScrollUp: lastScroll && scrollTop < lastScroll.scrollTop,

        scrollBottom: scrollBottom,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollRight: scrollRight,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
    };
    lastScroll = info;
    return info;
};

exports.default = getScrollInfo;
module.exports = exports['default'];