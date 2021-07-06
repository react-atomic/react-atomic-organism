import prism from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-tsx";
import get from "get-object-value";

const syntaxColorer = (code, language) => {
  let prismLanguage;
  switch (language) {
    case "ts":
      prismLanguage = prism.languages.tsx;
      break;

    case "js":
    case "sh":
      prismLanguage = prism.languages.jsx;
      break;

    case "diff":
      prismLanguage = { ...prism.languages.diff };
      // original `/^[-<].*$/m` matches lines starting with `<` which matches
      // <SomeComponent />
      // we will only use `-` as the deleted marker
      prismLanguage.deleted = /^[-].*$/m;
      break;

    default:
      prismLanguage = get(prism.languages, [language], prism.languages.jsx);
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

export default syntaxColorer;
