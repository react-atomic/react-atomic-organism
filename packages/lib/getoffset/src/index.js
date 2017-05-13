'use strict';

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

export {mouse};
export default getOffset;
