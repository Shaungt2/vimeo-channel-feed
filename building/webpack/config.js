"use strict";

var environment = require("../lib/environment");

var localLocations  = require("../locations/local");
var remoteLocations = require("../locations/remote");

var config = {
    entry: {
        main: [
            localLocations.files.mainJs
        ],
        vendor: [
            "babel-polyfill",
            "classnames",
            "core-decorators",
            "immutable",
            "lodash",
            "react",
            "react-dom",
            "react-redux",
            "react-router",
            "redux",
            "redux-actions",
            "redux-immutablejs",
            "redux-thunk",
            "reselect"
        ]
    },
    node: {
        __dirname: true
    },
    plugins: require("./plugins"),
    output : {
        path      : localLocations.dirs.dist.assets,
        publicPath: remoteLocations.paths.assets + "/",
        filename  : "[name].bundle.js"
    },
    resolve: {
        extensions: [ "", ".js" ],
        root      : localLocations.dirs.src
    },
    module: {
        noParse: [],
        loaders: [
            {
                test   : /\.js$/,
                exclude: [
                    localLocations.dirs.deps
                ],
                loaders: [
                    "babel",
                    "eslint"
                ]
            },
            {
                test   : /\.json$/,
                loaders: [ "json" ]
            },
            // BEGIN: css
            {
                test   : localLocations.files.mainCss,
                loaders: [
                    "style",
                    "css?importLoaders=1",
                    "postcss"
                ]
            },
            {
                test   : /\.css$/,
                include: localLocations.dirs.deps,
                loaders: [
                    "style",
                    "css?importLoaders=1"
                ]
            },
            {
                test   : /\.css$/,
                exclude: [
                    localLocations.files.mainCss,
                    localLocations.dirs.deps
                ],
                loaders: [
                    "style",
                    "css?modules&importLoaders=1",
                    "postcss"
                ]
            },
            // END: css
            // BEGIN: images
            {
                test  : /\.(png|jpg)$/,
                // inline base64 URLs for <=8k images, direct URLs for the rest
                loader: "url?limit=8192"
            },
            {
                test  : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            // END: images
            // BEGIN: fonts
            {
                test  : /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            },
            {
                test  : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/octet-stream"
            },
            {
                test  : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }
            // END: fonts
        ]
    },
    devServer: {
        hot   : true,
        inline: true,
        stats : { colors: true }
    },

    eslint : require("./eslint"),
    postcss: require("./postcss")
};

if (environment.isDevelopment) {
    config.devtool = "inline-source-map";
}

module.exports = config;
