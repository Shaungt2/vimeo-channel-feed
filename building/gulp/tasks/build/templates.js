import gulp from "../../index";
import loadPlugins from "gulp-load-plugins";

import localLocations from "../../../locations/local";
import remoteLocations from "../../../locations/remote";

const plugins = loadPlugins();

gulp.task("build:templates", false, () => gulp
    .src(localLocations.globs.templates)
    .pipe(plugins.nunjucksRender({
        data: {
            bundles: [
                remoteLocations.files.vendorBundle,
                remoteLocations.files.mainBundle
            ]
        },
        ext: ".html"
    }))
    .pipe(gulp.dest(localLocations.dirs.dist.root))
);
