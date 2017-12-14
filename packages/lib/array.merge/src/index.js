'use strict';

const isArray = Array.isArray;

const arrayMerge = function() 
{
    const arg = Array.from(arguments);
    let arg1 = arg.shift(); 
    if (!isArray(arg1)) {
       arg1 = [arg1]; 
    }
    arg.forEach( a => {
        if (null === a || 'undefined' === typeof a) {
            return;
        }
        if (isArray(a)) {
            arg1 = arg1.concat(a);
        } else {
            arg1.push(a);
        }
    });
    return arg1;
}

export default arrayMerge;
