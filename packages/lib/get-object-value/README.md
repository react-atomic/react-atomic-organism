Get object value with paht
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
   * Arguments
      * object (Object): The object to query.
      * path (Array): The path of the property to get.
      * defaultValue ( option, Any ): The value returned for undefined resolved values.
   * Code:
      * https://github.com/react-atomic/react-atomic-organism/blob/master/packages/lib/get-object-value/src/index.js
      
## Example Usage

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

## Set Object Value
   * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/set-object-value

## Loadash
   * Doc https://lodash.com/docs/4.16.6#get


