'use strict';

let cache={};
const esc = /[|\\{}()[\]^$+*?.]/g;

const getKeyReg = (name)=>
{
    const thisName = name.replace(esc, '\\$&');
    if (!cache[name]) {
        const reg = '([#?&]'+thisName+'=)([^&#]*)';
        cache[name] = new RegExp(reg);
    }
    return cache[name];
}

export default getKeyReg;
