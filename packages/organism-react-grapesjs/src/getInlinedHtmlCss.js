import juice from 'juice';

const cleanClassReg = /(class\=")([^"]*)(c\d{0,4})(\s)?([^"]*)/g

const getInlinedHtmlCss = (editor, opts) => {
  const tmpl = editor?.getHtml() + `<style>${editor?.getCss()}</style>`;
  return juice(tmpl, opts)?.trim().replace(cleanClassReg, '$1$2$5');
}

export default getInlinedHtmlCss;
