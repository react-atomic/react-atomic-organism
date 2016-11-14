'use strict';

let cache={};
const esc = /[|\\{}()[\]^$+*?.]/g;

const getClassReg = (name)=>
{
    if (!cache[name]) {
        const sReg = '(?:^|\\s+)' + name.replace(esc, '\\$&')+ '(?:\\s+|$)';
        cache[name] = new RegExp(sReg);
    }
    return cache[name];
}

export default getClassReg;
