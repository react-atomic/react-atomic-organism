'use strict';

const _isArray = Array.isArray;

const getDefaultValue = (v) => {
    if ('function' === typeof v) {
        return v();
    }
    return v;
}

const getObjectValue = (o, path, defaultValue) => {
    if (null === o || 'undefined' === typeof o) {
        return getDefaultValue(defaultValue);
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
            current = getDefaultValue(defaultValue);
            return false;
        }
    });
    return current;
};

const getDefault = o => getObjectValue(o, ['default'], o);

export default getObjectValue;

export {getDefault};
