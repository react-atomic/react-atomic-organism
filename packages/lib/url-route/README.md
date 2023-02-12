# Simple Url Route(r)

-   GIT
    -   https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/url-route
-   NPM
    -   https://www.npmjs.com/package/url-route

## How to use?

```js
const router = new Router();
router.addRoute("/xxx*", ()=>{});
router.addRoute("/yyy*", ()=>{});
let match = router.match("/xxx/foo");
if (match) {
    match.fn()
} else if (match.next) {
    match = match.next("/xxx/foo");
}
```
