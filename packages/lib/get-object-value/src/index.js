'use strict';

const _isArray = Array.isArray;

const getObjectValue = (o, path, defaultValue) => {
    if (null === o || 'undefined' === typeof o) {
        return defaultValue;
    }
    if (!_isArray(path)) {
        return o;
    }
    let current = o;
    path.every((a) => {
        if (null !== current[a] && 'undefined' !== typeof current[a]) {
            current = current[a];
            return true;
        } else {
            current = defaultValue;
            return false;
        }
    });
    return current;
};

export default getObjectValue;
