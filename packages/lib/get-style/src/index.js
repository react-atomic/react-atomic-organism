'use strict';

const getStyle = (el, styleKey) => {
    if ('undefined' === typeof document) {
        return;
    }
    const doc = document;
    let styleValue = '';
    if (el.currentStyle) {
        styleValue = el.currentStyle[styleKey];
    } else if (doc.defaultView && doc.defaultView.getComputedStyle) {
        styleValue = doc.defaultView.getComputedStyle(el, null).getPropertyValue(styleKey);
    }
    if (styleValue && styleValue.toLowerCase) {
        return styleValue.toLowerCase();
    } else {
        return styleValue;
    }
}

export default getStyle;
