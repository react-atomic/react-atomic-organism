'use strict';

const dedup = (array) => 
    array.filter(
        (item, pos, arr) => arr.indexOf(item) === pos
    );

export default dedup;
