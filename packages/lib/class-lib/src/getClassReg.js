import getSafeReg,{cacheReg} from 'get-safe-reg';

const cache={};

const getRegString = name => '(?:^|\\s+)'+ getSafeReg(name)+ '(?:\\s+|$)';

export default name => cacheReg(cache)(getRegString)(name);
