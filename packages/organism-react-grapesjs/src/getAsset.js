import get from 'get-object-value';

const shareAssets = {
  'grapes.min.css':
    'https://cdn.jsdelivr.net/npm/grapesjs@0.15.3/dist/css/grapes.min.css',
  'grapes.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs@0.15.3/dist/grapes.min.js',
  'ckeditor.js': 'https://cdn.jsdelivr.net/npm/ckeditor4@4.14.0/ckeditor.js',
  'grapesjs-plugin-ckeditor.min.js':
    'https://cdn.jsdelivr.net/npm/grapesjs-plugin-ckeditor@0.0.9/dist/grapesjs-plugin-ckeditor.min.js',
};

const getAsset = (fileName, props, defaultAssets) => {
    const {assetPath, assets} = props;
    if (assetPath) {
      return assetPath + fileName;
    } else if (get(assets, [fileName])) {
      return assets[fileName];
    } else {
      return defaultAssets[fileName] || shareAssets[fileName];
    }
}

export default getAsset;
