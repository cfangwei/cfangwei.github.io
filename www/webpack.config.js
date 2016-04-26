var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var jQuery = require('jquery');

var LiveReloadPlugin = require('webpack-livereload-plugin');

var config = {
    entry: {
        main: './src/main.js',
        projects: './src/projects.js',
        card: './src/card.js',
        aboutme: './src/aboutme.js',
        planttrees: './works/plant-trees/src/plant-trees.js',
        wavecircleworld: './works/wavecircle-world/src/wavecircle-world.js',
        flipclock: './works/flip-clock/src/flip-clock.js',
        treeriver: './works/tree-river/src/index.js',
        circleline: './works/circleline/src/index.js',
        elasticcollision: './works/elastic-collision/src/elastic-collision.js',
        meteor: './works/meteor/src/main.js',
        textParticle: './works/text-particle/src/index.js',
        textParticleThrough: './works/text-particle/src/through.js',
        birdIndex: './works/bird/src/index.js',
        codeWall: './works/code-wall/src/index.js',
        textWeb:  './works/text-web/src/index.js',
        egg3d:  './works/egg3d/src/index.js',
        flybird:  './works/flybird/src/index.js',
        txtShakeDemo: './src/misc/txtSnakeDemo.js'
    },
    output: {
        path: __dirname + '/build/build',
        publicPath: '/build/',
        contentBase: 'build/js/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader' // 'babel-loader' is also a legal name to reference
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.scss$/,
                //loaders: ["style", "css", "sass", "autoprefixer"]
                loader: 'style-loader!css-loader!sass-loader!autoprefixer-loader?{browsers:[">1%"]}'
            },
            {
                test: /\.html$/, loader: "html"
            },
            {
                test: /\.txt$/, loader: "raw"
            },
            {
                test: /\.json$/, loader: "json"
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};

module.exports = config;
