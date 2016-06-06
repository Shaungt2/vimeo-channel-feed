"use strict";

var webpack = require("webpack");

var config = require("./config");

module.exports = function runWebPack(onWebPackDone) {

    return webpack(config, onWebPackDone);
};
