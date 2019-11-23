const webpack = require('reshow-app/webpack.client');

module.exports = webpack(__dirname, {mjml: './build/es/src/mjml'}, {disableVendor: true, output: {
  libraryExport: 'default',
  libraryTarget: 'umd',
}});

