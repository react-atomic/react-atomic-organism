'use strict';
import getScrollInfo from 'get-scroll-info'; 

const mouse = (e, dom) => {
    if (!dom) {
        dom = e.currentTarget;
    }
    const svg = dom.ownerSVGElement || dom;
    const x = e.clientX;
    const y = e.clientY;
    if (svg.createSVGPoint) {
        let point = svg.createSVGPoint();
        point.x = x;
        point.y = y;
        point = point.matrixTransform(dom.getScreenCTM().inverse());
        return [point.x, point.y];
    }
    const domXY = getOffset(dom);
    return [
        x - domXY.left - dom.clientLeft,
        y - domXY.top - dom.clientTop
    ];
}

const getOffset = (dom) => {
    let top = 0;
    let left = 0;
    let w;
    let h;
    if (dom instanceof SVGElement) {
        const scrollInfo = getScrollInfo();
        const rect = dom.getBoundingClientRect();
        top = rect.top + scrollInfo.top;
        left = rect.left + scrollInfo.left;
        w = rect.width;
        h = rect.height;
    } else {
        w = dom.offsetWidth;
        h = dom.offsetHeight;
        let el = dom;
        do {
            const offsetTop = el.offsetTop || 0;
            const offsetLeft = el.offsetLeft || 0;
            if ('BODY' === el.nodeName) {
                top += offsetTop;
                left += offsetLeft;
            } else {
                top += offsetTop - el.scrollTop;
                left += offsetLeft - el.scrollLeft;
            }
            el = el.offsetParent;
        } while (el);
    }
    const result =  {
        w,
        h,
        top,
        right: left+ w,
        bottom: top+ h,
        left,
    };
    return result;
}

export {mouse};
export default getOffset;
