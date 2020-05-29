import juice from "juice";

const cleanClassReg = /(class\=")([^"]*)(c\d{4})(\s)?([^"]*)/g;

const getInlinedHtmlCss = ({editor, html, css}, opts) => {
  if (null == html) {
    html = editor?.getHtml();
  }
  if (null == css) {
    css = editor?.getCss();
  }
  const tmpl = html + `<style>${css}</style>`;
  return juice(tmpl, opts)
    ?.trim()
    .replace(cleanClassReg, "$1$2$5");
};

export default getInlinedHtmlCss;
