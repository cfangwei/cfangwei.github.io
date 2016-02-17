var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var jQuery = require('jquery');

var LiveReloadPlugin = require('webpack-livereload-plugin');

var config = {
    entry: {
        main: './src/main.js',
        planttrees: './works/plant-trees/src/plant-trees.js',
        wavecircleworld: './works/wavecircle-world/src/wavecircle-world.js',
        flipclock: './works/flip-clock/src/flip-clock.js',
        treeriver: './works/tree-river/src/tree-river.js'
    },
    output: {
        path: __dirname + '/build',
        publicPath: '/build/',
        contentBase: 'build/',
        filename: '[name].bundle.js'
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
    ]
};

module.exports = config;
