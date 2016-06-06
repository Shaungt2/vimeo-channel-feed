import gulp from "../../index";

import localLocations from "../../../locations/local";

const deps = [ "build:templates" ];

gulp.task("watch:templates", false, deps, () => {

    gulp.watch(localLocations.globs.templates, deps);
});
