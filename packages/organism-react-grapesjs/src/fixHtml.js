import fixHtmlLib from "fix-html";

let sanitizeHtml;

const setSanitizeHtml = o => (sanitizeHtml = o);

const fixHtml = html => fixHtmlLib(html, sanitizeHtml);

export default fixHtml;

export { setSanitizeHtml };
