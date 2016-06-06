import runSequence from "run-sequence";

import localLocations from "../../locations/local";

import gulp from "../index";
import helpLink from "../lib/help/link";
import helpMultiline from "../lib/help/multiline";
import helpPath from "../lib/help/path";

const help = helpMultiline([
    "┬─ Builds templates files and outputs them to " + helpPath(localLocations.dirs.dist.root),
    "├─ Builds the assets in memory",
    "├─ Starts an http server at " + helpLink("http://0.0.0.0:8001") + " to serve the assets builded in memory",
    "├─ Run server task to serve the builded templates files in " + helpPath(localLocations.dirs.dist.root),
    "└─ Keeps watching for file modifications and re-runs the building when a change occurs"
]);

gulp.task("dev", help, onTaskDone => {

    runSequence(
        "watch",
        [ "server", "webpack-dev-server" ],
        onTaskDone
    );
});
