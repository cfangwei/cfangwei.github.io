var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var jQuery = require('jquery');

var LiveReloadPlugin = require('webpack-livereload-plugin');

var config = {
    entry: ['./src/main.js'],
    output: {
        path: __dirname + '/build',
        publicPath: '/assets/',
        contentBase: 'assets/',
        filename: 'mainBundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel' // 'babel-loader' is also a legal name to reference
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.html$/, loader: "html"
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin()
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     "window.jQuery": 'jquery'
        // })
    ]
};

module.exports = config;
