import prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-tsx';
import {doc} from 'win-doc';

let styleNode;
let lightTheme;
let darkTheme;
let oDoc = doc();

if (oDoc) {
  lightTheme = require('prismjs/themes/prism.css');
  darkTheme = require('prismjs/themes/prism-okaidia.css');
  styleNode = oDoc.createElement('style');
  styleNode.setAttribute('data-prism', 'true');
  styleNode.textContent = lightTheme;
  oDoc.head.appendChild(styleNode);
}

const setPrismTheme = theme => {
  styleNode.textContent = theme;
};

const highlight = (code, language) => {
  let prismLanguage;
  switch (language) {
    case 'ts':
      prismLanguage = prism.languages.tsx;
      break;

    case 'js':
    case 'sh':
      prismLanguage = prism.languages.jsx;
      break;

    case 'diff':
      prismLanguage = {...prism.languages.diff};
      // original `/^[-<].*$/m` matches lines starting with `<` which matches
      // <SomeComponent />
      // we will only use `-` as the deleted marker
      prismLanguage.deleted = /^[-].*$/m;
      break;

    default:
      prismLanguage = prism.languages[language];
      break;
  }

  if (!prismLanguage) {
    if (language) {
      throw new Error(`unsuppored language: "${language}", "${code}"`);
    } else {
      prismLanguage = prism.languages.jsx;
    }
  }

  return prism.highlight(code, prismLanguage);
};

export default highlight;
export {lightTheme, darkTheme, setPrismTheme};
