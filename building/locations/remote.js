"use strict";

var config = require("../config");

var basePath     = config.basePath;
var vimeoApiPath = config.vimeoApiPath;
var assetsPath   = basePath + "/assets";

module.exports = {
    paths: {
        base    : basePath,
        vimeoApi: vimeoApiPath,
        assets  : assetsPath
    },

    files: {
        mainBundle  : assetsPath + "/main.bundle.js",
        vendorBundle: assetsPath + "/vendor.bundle.js"
    }
};
