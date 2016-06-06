import gulp from "../../index";
import loadPlugins from "gulp-load-plugins";

import runWebpack from "../../../webpack/run";

const plugins = loadPlugins();

gulp.task("build:assets", false, onTaskDone => {

    runWebpack((err, stats) => {

        const gutil = plugins.util;

        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            // colors      : $.util.colors.supportsColor,
            colors      : true,
            hash        : true,
            version     : true,
            timings     : true,
            chunks      : true,
            chunkModules: true,
            cached      : true,
            cachedAssets: true
        }));

        onTaskDone();
    });
});
