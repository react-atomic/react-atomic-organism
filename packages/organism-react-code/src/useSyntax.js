import { useState } from "react";
import { getDefault } from "get-object-value";
let marked;

const useSyntax = () => {
  const [syntax, setSyntax] = useState(() => marked || (() => {}));
  if (!marked) {
    import("./markdownLib").then((o) => {
      marked = getDefault(o);
      /**
       * Need use callback here,
       * avoid call by set hook.
       */
      setSyntax(() => marked);
    });
  }
  return syntax;
};

export default useSyntax;
