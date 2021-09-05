Get safe regular-expression
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/get-safe-reg
   * NPM
      * https://www.npmjs.com/package/get-safe-reg 

## !!Important!! 
__Wrose case on compress code with cache currying__
* Bad (Do not use it in compresss code)
```
import getSafeReg, {cacheReg} from 'get-safe-reg';

const getRegString = name => '(?:^|\\s+)'+ getSafeReg(name)+ '(?:\\s+|$)';

const cache={};

export default name => cacheReg(cache)(getRegString)(name);
```

* Good
```
import getSafeReg, {cacheReg} from 'get-safe-reg';

const getRegString = name => '(?:^|\\s+)'+ getSafeReg(name)+ '(?:\\s+|$)';

const cache = cacheReg({})(getRegString)

export default name => cache(name);
```
