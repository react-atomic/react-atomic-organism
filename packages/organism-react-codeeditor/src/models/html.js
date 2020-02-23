import HtmlPreview from '../../ui/organisms/HtmlPreview';
import fixHtml from 'fix-html';

const html = {
  setValue: e => {
    e.value = e.codemirror.getValue();
    e.getCode = () => {
      return fixHtml(e.value, e.iframeWindow?.sanitizeHtml || null);
    }
    return e;
  },
  getCode: e => {
  },
  jsList: [
    'https://cdn.jsdelivr.net/npm/sanitize-html@1.20.1/dist/sanitize-html.min.js',
  ],
  codeMirrorJs: [
    'mode/xml/xml.min.js',
    'mode/javascript/javascript.min.js',
    'mode/css/css.min.js',
    'mode/htmlmixed/htmlmixed.min.js',
  ],
  preview: HtmlPreview,
};

export default html;
