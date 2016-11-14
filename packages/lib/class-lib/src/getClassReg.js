'use strict';

const getClassReg = (name)=>
{
    const sReg = '(?:^|\\s+)' + name + '(?:\\s+|$)';
    return sReg;
}

export default getClassReg;
