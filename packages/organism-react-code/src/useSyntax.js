import { useState } from "react";
import { getDefault } from "get-object-value";
let marked;

const useSyntax = () => {
  const [syntax, setSyntax] = useState(() => marked || (() => {}));
  import("./markdownLib").then((o) => {
    marked = getDefault(o);
    setSyntax(() => marked);
  });
  return syntax;
};

export default useSyntax;
