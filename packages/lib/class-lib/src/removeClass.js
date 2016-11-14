'use strict';

import getReg from './getClassReg';
import hasClass from './hasClass';

const removeClass = (classes, name)=>
{
    if (classes && hasClass(classes, name)) {
        const sReg = getReg(name);
        classes = classes.replace(
            sReg, ' '
        ).replace(
            /(^\s+)|\s+$/g, '' 
        );
        if ( hasClass(classes, name) ) { // in case of multiple adjacent
            classes = removeClass(classes, name);
        }
    }
    return classes;
}

export default removeClass;
