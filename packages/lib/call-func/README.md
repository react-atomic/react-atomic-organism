# Call Function

- GIT
  - https://github.com/react-atomic/react-atomic-organism/tree/main/packages/lib/call-func
- NPM
  - https://www.npmjs.com/package/call-func

## `Event addEventListener wrapper`

- `subscribe`

**HTML**

```html
<button>Click</button>
```

**JS**

```js
import { register, cleanAllRegister } from "call-func";
const oReg = register(document.querySelector("button"));
const regId = oReg.addEventListener("click", () => {
  console.log("click");
});
```

- `unsubscribe` by id

```js
// clean one
oReg.removeEventListener(regId);

// clean one dom events by type.
oReg.cleanAll("click");

// clean one dom all events.
oReg.cleanAll();

// clean events which regist by this library.
cleanAllRegister();
```

- [More Example](https://github.com/react-atomic/react-atomic-organism/blob/main/packages/lib/call-func/src/__tests__/registerTest.js)
