Object nested
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/nested values
   * NPM
      * https://npm.im/set-object-value

## How to use
```
import set from 'set-object-value';

const obj={};
set(obj, ['a', 'b'], 'c');

console.log(obj);

//=> { a: { b: 'c' } }
```


