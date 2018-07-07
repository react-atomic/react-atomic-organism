React Ajax 
===
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/organism-react-ajax 
   * NPM
      * https://npm.im/organism-react-ajax

## callback parameters
callback(json, text, response)

## dlog
   * https://unpkg.com/organism-react-ajax/build/src/lib/dlog.js
   * https://cdn.jsdelivr.net/npm/organism-react-ajax/build/src/lib/dlog.min.js

## Example Usage
Demo Url:
https://react-atomic-ui.js.org/

## IE11 support
```
<script src="//cdn.jsdelivr.net/npm/babel-polyfill@6.26.0/dist/polyfill.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
```

* Worker
```
require('es6-promise/auto')
```
You can not just use external script for es6-promise/auto in IE11,
because webworker will have js error (Promise not defined),
when you use dynamic import('some file').then(/some code/)

