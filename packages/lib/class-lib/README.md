ClassName Library
===============
Better classname tool, especially more make sense for reactjs that change all first parameters to pure class string.
   * GIT
      * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/lib/class-lib
   * NPM
      * https://npm.im/class-lib

## Functions
### hasClass( rawClass, newName )
   * Ex: rawClass = "a b c"
   * hasClass(rawClass, "d") // return false
   * hasClass(rawClass, "a") // return true

### removeClass( rawClass, newName )
   * Ex: rawClass = "a b c"
   * removeClass(rawClass, "a"); // return "b c"

### mixClass( rawClass, newName )
   * Ex. rawClass = "a b c"
   * mixClass(rawClass, "d"); // return "a b c d"
   * mixClass(rawClass, "d", "e"); // return "a b c d e"
   * mixClass(rawClass, {d: false, e: true}); // return "a b c e"

### toggleClass( rawClass, newName )
   * Ex. rawClass = "a b c"
   * toggleClass(rawClass, "d"); //return "a b c d"
   * toggleClass(rawClass, "c"); //return "a b"
