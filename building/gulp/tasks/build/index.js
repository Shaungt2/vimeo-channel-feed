import gulp from "../../index";
import helpEnvVar from "../../lib/help/env-var";
import helpMultiline from "../../lib/help/multiline";
import helpPath from "../../lib/help/path";

const help = helpMultiline([
    "─┬ Builds the site (templates and assets files) and outputs the result to " + helpPath("site/dist") + " folder",
    " └┬ if " + helpEnvVar("NODE_ENV", "production"),
    "  ├─ it also minifies the bundles",
    "  └─ it also uglifies the bundles"
]);

gulp.task("build", help, [
    "build:templates",
    "build:assets"
]);
