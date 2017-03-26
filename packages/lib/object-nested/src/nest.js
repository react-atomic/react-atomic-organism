'use strict';

const keys = Object.keys;

const replaceObjectValue = (obj, arrKey, val) =>
{
    let last = arrKey.pop();
    arrKey.forEach((k)=>{
        obj[k] = obj[k] || {};
        obj = obj[k];
    });
    obj[last] = val;
}

const nest = (a, delimiter) =>
{
    if (!delimiter) {
        delimiter = '.';
    }
    let tree = {};
    const arrKey = keys(a);
    arrKey.forEach((k)=>{
        if (-1===k.indexOf(delimiter)) {
            tree[k] = a[k];
            return;
        }
        let subKeys = k.split(delimiter);
        replaceObjectValue(
            tree,
            subKeys,
            a[k]
        );
    });
    return tree;
}

export default nest;
