'use strict';

const _isArray = Array.isArray;

const getObjectValue = (o, path, defaultValue) => {
    let current = o;
    if (!_isArray(path)) {
        return undefined;
    }
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
