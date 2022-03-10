Call Function
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/call-func
   * NPM
      * https://www.npmjs.com/package/call-func 


## `Event addEventListener wrapper`
   * subscribe

```html
<button>Click</button>
```

```js
import {register, cleanAllRegister} from "call-func";
const oReg = register(document.querySelector("button"));
const regId = oReg.addEventListener("click", ()=>{console.log("click")});
```

   * unsubscribe 
```js
oReg.removeEventListener(regId);
```

   * [More Example](https://github.com/react-atomic/react-atomic-organism/blob/main/packages/lib/call-func/src/__tests__/registerTest.js)

