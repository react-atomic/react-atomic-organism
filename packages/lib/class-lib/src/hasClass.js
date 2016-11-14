'use strict';

import getReg from './getClassReg';

const hasClass = (classes, name)=>
{
    const sReg = getReg(name);
    const oReg = new RegExp(sReg);
    return oReg.test(classes);
}

export default hasClass;
