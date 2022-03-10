Call Function
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/call-func
   * NPM
      * https://www.npmjs.com/package/call-func 


## `Event addEventListener wrapper`
   * `subscribe`

__HTML__
```html
<button>Click</button>
```
__JS__
```js
import {register, cleanAllRegister} from "call-func";
const oReg = register(document.querySelector("button"));
const regId = oReg.addEventListener("click", ()=>{console.log("click")});
```

   * `unsubscribe` by id
```js
// clean one
oReg.removeEventListener(regId);

// clean all
cleanAllRegister();
```

   * [More Example](https://github.com/react-atomic/react-atomic-organism/blob/main/packages/lib/call-func/src/__tests__/registerTest.js)

