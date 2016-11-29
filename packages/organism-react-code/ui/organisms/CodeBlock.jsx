import React from 'react';
import marked from 'marked';
import {Unsafe} from 'react-atomic-molecule';
import hl from 'highlight.js';

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: (code, lang) => {
    return hl.highlight(lang, code).value;
  }
});

const CodeBlock = (props) =>
{
    const text = `\`\`\`js
${props.children}
\`\`\``;

    return <Unsafe>{marked(text)}</Unsafe>;
}

export default CodeBlock;
