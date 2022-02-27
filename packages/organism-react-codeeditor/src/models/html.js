import HtmlPreview from "../../ui/organisms/HtmlPreview";
import fixHtml from "fix-html";

const html = {
  options: {
    mode: "htmlmixed",
    matchTags: { bothTags: true },
  },
  setValue: (e) => {
    e.value = e.codemirror.getValue();
    e.getCode = () => {
      return fixHtml(e.value, e.iframeWindow?.sanitizeHtml || null);
    };
    return e;
  },
  libJS: [
    "https://cdn.jsdelivr.net/npm/sanitize-html@1.20.1/dist/sanitize-html.min.js",
  ],
  codeMirrorJS: [
    "mode/xml/xml.min.js",
    "mode/javascript/javascript.min.js",
    "mode/css/css.min.js",
    "mode/htmlmixed/htmlmixed.min.js",
    "addon/edit/matchtags.min.js",
    "addon/fold/xml-fold.min.js",
  ],
  preview: HtmlPreview,
};

export default html;
