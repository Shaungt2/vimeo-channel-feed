"use strict";

var webpack = require("webpack");

var environment = require("../lib/environment");
var config      = require("../config");

var plugins = [
    new webpack.DefinePlugin({
        "__config"            : JSON.stringify(config),
        "process.env.NODE_ENV": JSON.stringify(environment.current)
    }),

    new webpack.ProvidePlugin({
        fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),

    new webpack.optimize.CommonsChunkPlugin({
        minChunks: Infinity,
        name     : "vendor"
    })
];

if (environment.isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = plugins;
