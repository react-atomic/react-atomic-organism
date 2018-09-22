import getSafeReg, {cacheReg} from 'get-safe-reg';

const getRegString = name => '(([#?&])' + getSafeReg(name) + '=)([^&#]*)';

const cache = cacheReg({})(getRegString);

export default name => cache(name);
