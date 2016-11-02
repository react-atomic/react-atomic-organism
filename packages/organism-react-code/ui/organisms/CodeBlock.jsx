import React from 'react';
import marked from 'marked';
import {Unsafe} from 'react-atomic-molecule';

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code, lang) {
    return require('highlight.js').highlight(lang, code).value;
  },
});

const CodeBlock = (props) =>
{
    const text = `\`\`\`js
${props.children}
\`\`\``;

    return <Unsafe>{marked(text)}</Unsafe>;
}

export default CodeBlock;
