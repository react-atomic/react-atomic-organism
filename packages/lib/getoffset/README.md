Get Dom Offset
===============
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/getoffset
   * NPM
      * https://npm.im/getoffset

## Why not use getBoundingClientRect (Already fixed by add scroll size but keep for remind)
  * getBoundingClientRect will not get correct top value.
  * getBoundingClientRect could resolve transform translate x, but the same can not get y.
  * In organism-react-popup we use isFollowTransform props to resolve transform issue. 

