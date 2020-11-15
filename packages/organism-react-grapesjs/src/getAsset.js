import get from "get-object-value";

const shareAssets = {
  "grapes.min.css":
    "https://cdn.jsdelivr.net/npm/grapesjs@0.16.22/dist/css/grapes.min.css",
  "grapes.min.js":
    "https://cdn.jsdelivr.net/npm/grapesjs@0.16.22/dist/grapes.min.js",
  // ckeditor can not use ckeditor.min.js
  "ckeditor.js": "https://cdn.jsdelivr.net/npm/ckeditor4@4.15.0/ckeditor.js",
  "mjml.js":
    "https://cdn.jsdelivr.net/npm/organism-react-grapesjs@0.5.3/dist/mjml.min.js",
  //    "http://localhost:8000/assets/mjml.bundle.js",
};

const getAsset = (fileName, props, defaultAssets) => {
  const { assetPath, assets } = props;
  if (assetPath) {
    return assetPath + fileName;
  } else if (get(assets, [fileName])) {
    return assets[fileName];
  } else {
    return defaultAssets[fileName] || shareAssets[fileName];
  }
};

export default getAsset;
