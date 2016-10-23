'use strict';
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ENV = process.env.NODE_ENV;
let json = process.env.PHP_CONFIG || '{}';
const PHPC = JSON.parse(json);

let plugins = [
    new webpack.optimize.DedupePlugin(),
    new CommonsChunkPlugin(
        /* chunkName= */"vendor", 
        /* filename= */"vendor.bundle.js"
    ),
];
if ('production' === ENV) {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production'),
            '__DEVTOOLS__': false
          }
        }),
        new UglifyJsPlugin({
            compress: { warnings: false}
        }),
    ]);
}
let vendor = ['react'];
if (PHPC.webpackVendor) {
    vendor = vendor.concat(PHPC.webpackVendor);
}

module.exports = {
//	devtool: 'sourcemap',
	entry: {
            main: "./build/src/entry.js",
            vendor: vendor
        },
	output: {
            filename: "bundle.js",
            path: __dirname + "/assets" ,
            publicPath: PHPC.assetsRoot,
            chunkFilename: "[id].[hash].bundle.js"
	},
        node: {
            fs: "empty"
        },
        resolve: {
            extensions: ['','.js','.jsx'],
            alias: {
                "react": __dirname + '/node_modules/react'
            }
        },
        resolveLoader: {
            root: __dirname + '/node_modules'
        },
	module: {
	    loaders: [
                  { 
                    test: /(.js|.jsx)$/, 
           //         exclude: /node_modules/,
                    loader: "babel-loader", 
                    query:{
                        cacheDirectory:true
                    } 
                  },
                  { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=8192' }
	    ]
	},
	plugins: plugins
};
