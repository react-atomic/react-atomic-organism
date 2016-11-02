GetObjectValue
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/get-object-value 
   * NPM
      * https://npm.im/get-object-value

## Spec
```
import get from 'get-object-value';
get(object, path, defaultValue)
```

## Example Usage
   * Code:
      * https://github.com/react-atomic/react-atomic-organism/blob/master/packages/lib/get-object-value/src/index.js
   * How to use?
```

import get from 'get-object-value';

let demoObject = {
  a: {
    b: c1
  }
};

let v1 = get(demoObject, ['a','b']); // return c1

let v1 = get(demoObject, ['a','b','d'], 'c2'); // return c2

```




