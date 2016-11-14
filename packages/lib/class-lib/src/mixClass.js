'use strict';

const isArray = Array.isArray;
const keys = Object.keys;

const mixClass = function() 
{
    let classes = [];
    let all = keys(arguments);
    all.forEach((key)=>
    {
        const arg = arguments[key];
        if (!arg) {
            return;
        }
        const argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (isArray(arg)) {
            classes.push(mixClass.apply(null, arg));
        } else if (argType === 'object') {
            const argKeys = keys(arg);
            argKeys.forEach((k)=>{
                if (arg[k]) {
                    classes.push(k);
                }
            });
        }
    });
    return classes.join(' ');
}

export default mixClass;
