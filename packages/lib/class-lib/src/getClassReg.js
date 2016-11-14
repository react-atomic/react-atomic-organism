'use strict';

let cache={};

const getClassReg = (name)=>
{
    if (!cache[name]) {
        const sReg = '(?:^|\\s+)' + name + '(?:\\s+|$)';
        cache[name] = new RegExp(sReg);
    }
    return cache[name];
}

export default getClassReg;
