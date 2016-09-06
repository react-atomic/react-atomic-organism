'use strict';

export default function getOffset(dom) {
    let top = 0;
    let left = 0;
    let el = dom;
    do {
        top += el.offsetTop  || 0;
        left += el.offsetLeft || 0;
        el = el.offsetParent;
    } while (el);

    return {
        top: top,
        left: left,
        right: left+ dom.offsetWidth,
        bottom: top+ dom.offsetHeight,
    };
}
