import loadPlugins from "gulp-load-plugins";

import gulp from "../index";

import runWebpackDevServer from "../../webpack/run-dev-server";

const plugins = loadPlugins();

const host = "0.0.0.0";
const port = 8001;

gulp.task("webpack-dev-server", false, (/*onTaskDone*/) => {

    runWebpackDevServer(host, port, err => {

        const gutil = plugins.util;

        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }

        gutil.log(
            "[webpack-dev-server]",
            `http://${ host }:${ port }/webpack-dev-server`
        );

        // keep the server alive or continue?
        // onTaskDone();
    });
});
