Array deduplication
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/array.merge
   * NPM
      * https://npm.im/array.merge

## How to use?
```
import merge from 'array.merge'; 

const acture = merge('a');   // return ['a']
const acture = merge(['a']); // return ['a']
const acture = merge(['a'], ['b']); // return ['a', 'b']
const acture = merge('a', ['b']);   // return ['a', 'b']
const acture = merge('a', 'b');     // return ['a', 'b']
const acture = merge(['a'], ['b'], ['c']);    // return ['a', 'b', 'c']
```


