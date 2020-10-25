import fixHtmlLib from "fix-html";

let sanitizeHtml;

const setSanitizeHtml = (o) => (sanitizeHtml = o);

const fixHtml = (html, isComponent) =>
  fixHtmlLib(html, sanitizeHtml, isComponent);

export default fixHtml;

export { setSanitizeHtml };
