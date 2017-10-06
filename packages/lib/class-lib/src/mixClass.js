'use strict';

const isArray = Array.isArray;
const keys = Object.keys;
const dedup = (arr) => Array.from(new Set(arr));

const mixClass = function() 
{
    let classes = [];
    keys(arguments).forEach((key)=>
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
            keys(arg).forEach((k)=>{
                if (arg[k]) {
                    classes.push(k);
                }
            });
        }
    });
    return dedup(classes).join(' ');
}

export default mixClass;
