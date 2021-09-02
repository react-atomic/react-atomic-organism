'use strict';

const webpack = require('reshow-app/webpack.client');

module.exports = webpack(__dirname, {main: './build/es/src/client'});
