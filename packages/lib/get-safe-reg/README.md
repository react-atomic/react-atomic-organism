# Get safe regular-expression

-   GIT
    -   https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/get-safe-reg
-   NPM
    -   https://www.npmjs.com/package/get-safe-reg

## !!Important!!

**Wrose case on compress code with cache currying**

-   Bad (Do not use it in compresss code)

```
const cache={};
export default name => cacheReg(cache)(getRegString)(name);
```

-   Good

```
const cache = cacheReg({})(getRegString)
export default name => cache(name);
```
