"use strict";

var WebpackDevServer = require("webpack-dev-server");

var config     = require("./config");
var runWebpack = require("./run");

module.exports = function runWebpackDevServer(host, port, onStarted) {

    var webpackServer = new WebpackDevServer(
        runWebpack(),
        config.devServer
    );

    webpackServer.listen(
        port,
        host,
        onStarted
    );

    return webpackServer;
};
