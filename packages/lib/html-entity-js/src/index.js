import { doc } from "win-doc";

const getTextarea = () => doc().createElement('textarea');

const htmlEncode = s => {
  const textarea = getTextarea();
  textarea.appendChild(doc().createTextNode(s));
  return textarea.innerHTML;
};

const htmlDecode = s => {
  const textarea = getTextarea();
  textarea.innerHTML = s;
  return textarea.textContent;
}

export {htmlEncode, htmlDecode};
