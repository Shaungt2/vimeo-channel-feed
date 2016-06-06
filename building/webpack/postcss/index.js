"use strict";

var autoPrefixer = require("autoprefixer");
var calc         = require("postcss-calc");
var customMedia  = require("postcss-custom-media");
var cssVariables = require("postcss-css-variables");
var reporter     = require("postcss-reporter");

module.exports = {
    defaults: [
        reporter({ throwError: true }),
        cssVariables({
            variables: require("./variables")
        }),
        calc,
        autoPrefixer,
        customMedia({
            extensions: require("./extensions")
        })
    ]
};
