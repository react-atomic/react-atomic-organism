'use strict';

const dedup = (array) => {
    if (!array || !array.filter) {
        return array;
    }
    return array.filter(
        (item, pos, arr) => arr.indexOf(item) === pos
    );
}

export default dedup;
