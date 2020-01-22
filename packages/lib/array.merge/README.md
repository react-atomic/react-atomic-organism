Array merge
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/array.merge
   * NPM
      * https://npm.im/array.merge

## How to use?

### Merge
```
import merge from 'array.merge'; 

const acture = merge('a');   // return ['a']
const acture = merge(['a']); // return ['a']
const acture = merge(['a'], ['b']); // return ['a', 'b']
const acture = merge('a', ['b']);   // return ['a', 'b']
const acture = merge('a', 'b');     // return ['a', 'b']
const acture = merge(['a'], ['b'], ['c']);    // return ['a', 'b', 'c']
```

### combine
```
import {combine} from 'array.merge'; 
const arr = {
  foo: ['a', 'b', 'c'],
  bar: ['d', 'e', 'f']
};

const acture = combine(arr);
/** return 
* [
*   {foo: 'a', bar: 'd'},
*   {foo: 'b', bar: 'e'},
*   {foo: 'c', bar: 'f'},
* ]
*/
```



