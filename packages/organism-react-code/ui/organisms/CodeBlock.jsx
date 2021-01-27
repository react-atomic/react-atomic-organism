import React from "react";
import marked from "marked";
import { Unsafe } from "react-atomic-molecule";
import hl from "highlight.js";

const DEFAULT_LANG = "js";

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: (code, lang) => {
    return hl.highlight(lang || DEFAULT_LANG, code).value;
  },
});

const CodeBlock = (props) => {
  const text = `\`\`\`${DEFAULT_LANG}
${props.children}
\`\`\``;

  return <Unsafe>{marked(text)}</Unsafe>;
};

export default CodeBlock;
