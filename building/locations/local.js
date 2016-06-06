"use strict";

var path = require("path");

var rootDir = path.join(__dirname, "../..");
var depsDir = path.join(rootDir, "node_modules");
var srcDir  = path.join(rootDir, "src");
var distDir = path.join(rootDir, "dist");

module.exports = {
    dirs: {
        deps: depsDir,
        src : srcDir,
        dist: {
            root  : distDir,
            assets: path.join(distDir, "assets")
        }
    },

    files: {
        eslintConfig: path.join(rootDir, ".eslintrc.json"),
        mainCss     : path.join(srcDir, "index.css"),
        mainJs      : path.join(srcDir, "main.js"),
        packageJson : path.join(rootDir, "package.json")
    },

    globs: {
        templates: srcDir + "/**/*.tpl"
    }
};
