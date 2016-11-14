'use strict';

const isArray = Array.isArray;
const keys = Object.keys;

const mixClass = () =>
{
    let classes = [];
    const arr = arguments;
    arr.forEach((arg)=>{
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
            argKeys.forEach((item)=>{
                if (arg[item]) {
                    classes.push(key);
                }
            });
        }
    });
    return classes.join(' ');
}

export default mixClass;
