'use strict';

import replaceValue from 'set-object-value';

const keys = Object.keys;

const nest = (a, delimiter) =>
{
    if (!delimiter) {
        delimiter = '.';
    }
    let tree = {};
    keys(a).forEach((k)=>{
        if (-1===k.indexOf(delimiter)) {
            tree[k] = a[k];
            return;
        }
        let subKeys = k.split(delimiter);
        replaceValue(
            tree,
            subKeys,
            a[k]
        );
    });
    return tree;
}

export default nest;
