"use strict";

var _ = require("lodash");

var curEnvironment = require("../lib/environment").current;

var commonConfig = require("./common");
var envConfig    = require("./" + curEnvironment);

module.exports = _.merge({}, commonConfig, envConfig);
