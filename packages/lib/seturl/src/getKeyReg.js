'use strict';

import getSafeReg,{cacheReg} from 'get-safe-reg';

const cache={};

const getRegString = name => 
    '(([#?&])'+getSafeReg(name)+'=)([^&#]*)';

export default name => cacheReg(cache)(getRegString)(name);
