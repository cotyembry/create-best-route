// //Current build path represents where the file needs to go to
// const WebpackShellPlugin = require('webpack-shell-plugin');
// var MOVE_FILE_TO = 'Y:/marsjs/js/build/MARSBPCHART/distribute';
// var RECOMPILE_ON_THIS_FILE = MOVE_FILE_TO + '/bundle.js';
// var shellCommand2 = 'mv ./dist/bundle.js ' + MOVE_FILE_TO;
// var _onBuildEnd = shellCommand2;
/*
var WebpackOnBuildPlugin = require('on-build-webpack');
var child_process = require('child_process');

child_process.exec('path_to_your_executables', function(error, stdout, stderr) {
    console.log(stdout);
});
*/
const webpack = require('webpack'); //this is used for a production build

module.exports = {
  entry: './js/index.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              plugins: ['transform-runtime'],
              presets: ['es2015', 'stage-0', 'react'],
            }
        },
        {
            test: /\.css$/,
            loader: 'style-loader'
        },
        {
            test: /\.css$/,
            loader: 'css-loader'
            // query: {
            //   modules: true,
            //   localIdentName: '[name]__[local]__[hash:base64:5]'
            // }
        }
    ]
  },
  plugins: [
    /*
    new WebpackOnBuildPlugin(function(stats) {
      child_process.exec('dir', function(error, stdout, stderr) {
          console.log(stdout);
      });
    })
    */
    // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildExit:[_onBuildEnd]}),
    /*new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()*/
  ]
}
