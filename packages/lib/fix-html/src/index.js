import {win} from 'win-doc';

const fixHtml = s => {
  const d = new (win().DOMParser)();
  const xml = new (win()).XMLSerializer();
  const html = xml.serializeToString(d.parseFromString(s || '', 'text/html'));
  return html.replace(/(\<)([^\>]*)("\="")([^\>]*)/g,'$1$2$4');
};
export default fixHtml;
