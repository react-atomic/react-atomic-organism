import getSafeReg from 'get-safe-reg';

const cache={};

const getRegString = name => '(?:^|\\s+)'+ getSafeReg(name)+ '(?:\\s+|$)';

const getClassReg = name =>
{
    if (!cache[name]) {
        cache[name] = new RegExp(getRegString(name));
    }
    return cache[name];
}

export default getClassReg;
