"use strict";

var localLocations = require("../locations/local");

var version = require(localLocations.files.packageJson).version;

module.exports = {
    basePath    : "",
    version     : version,
    vimeoApiPath: "/vimeo"
};
