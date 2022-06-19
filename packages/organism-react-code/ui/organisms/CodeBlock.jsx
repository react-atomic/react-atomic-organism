import React from "react";
import { Unsafe } from "react-atomic-molecule";
import useSyntax from "../../src/useSyntax";

const DEFAULT_LANG = "js";

const CodeBlock = (props) => {
  const syntax = useSyntax();
  const text = `\`\`\`${DEFAULT_LANG}
${props.children}
\`\`\``;
  return <Unsafe>{syntax(text)}</Unsafe>;
};

export default CodeBlock;
