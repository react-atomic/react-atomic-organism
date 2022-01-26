React Ajax 
===
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/main/packages/organism-react-ajax 
   * NPM
      * https://www.npmjs.com/package/organism-react-ajax

## callback parameters
callback(json, text, response)

## dlog
   * https://cdn.jsdelivr.net/npm/organism-react-ajax/build/src/lib/dlog.min.js

## Example Usage
   * Demo Url:
      * https://react-atomic-ui.js.org/#/Organisms#ajax 

## IE11 support
   * Worker
```
import 'es6-promise/auto';
```
You can not just use external script for es6-promise/auto in IE11,
because webworker will have js error (Promise not defined),
when you use dynamic import('some file').then(/some code/)

