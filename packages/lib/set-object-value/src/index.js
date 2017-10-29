'use strict';

const replaceValue = (obj, arrKey, val) =>
{
    let last = arrKey.pop();
    arrKey.forEach((k)=>{
        obj[k] = obj[k] || {};
        obj = obj[k];
    });
    obj[last] = val;
}

export default replaceValue;
