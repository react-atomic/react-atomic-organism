'use strict';

import dedup from 'array.dedup';

const isArray = Array.isArray;
const keys = Object.keys;

const mixClass = function() 
{
    const classes = [];
    const args = arguments;
    keys(args).forEach((key)=>
    {
        const arg = args[key];
        if (!arg) {
            return;
        }
        const argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (isArray(arg)) {
            classes.push(mixClass.apply(null, arg));
        } else if (argType === 'object') {
            keys(arg).forEach((k)=>{
                if (arg[k]) {
                    classes.push(k);
                }
            });
        }
    });
    let cookClasses = [];
    classes.forEach(c => cookClasses = cookClasses.concat(c.split(' ')));
    return dedup(cookClasses).join(' ');
}

export default mixClass;
