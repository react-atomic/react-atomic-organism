'use strict';

const _isArray = Array.isArray;

const getObjectValue = (o, path, defaultValue) => {
    if (!o || !_isArray(path)) {
        return defaultValue;
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
