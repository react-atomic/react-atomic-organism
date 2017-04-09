'use strict';

const _isArray = Array.isArray;

const getObjectValue = (o, path, defaultValue) => {
    if (!o) {
        return defaultValue;
    }
    if (!_isArray(path)) {
        return o;
    }
    let current = o;
    path.every((a) => {
        if ( current[a] ) {
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
