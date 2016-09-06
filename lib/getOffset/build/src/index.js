'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOffset;
function getOffset(dom) {
    var top = 0;
    var left = 0;
    var el = dom;
    do {
        top += el.offsetTop || 0;
        left += el.offsetLeft || 0;
        el = el.offsetParent;
    } while (el);

    return {
        top: top,
        left: left,
        right: left + dom.offsetWidth,
        bottom: top + dom.offsetHeight
    };
}
module.exports = exports['default'];