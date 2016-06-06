"use strict";

require("babel-register");
require("babel-polyfill");

var requireDir = require("require-dir");

requireDir("./tasks", {
    recurse: true
});
