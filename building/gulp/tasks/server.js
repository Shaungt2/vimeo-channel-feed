import loadPlugins from "gulp-load-plugins";

import gulp from "../index";
import helpEnvVar from "../lib/help/env-var";
import helpLink from "../lib/help/link";
import helpMultiline from "../lib/help/multiline";
import helpPath from "../lib/help/path";

import environment from "../../lib/environment";

import localLocations from "../../locations/local";
import remoteLocations from "../../locations/remote";

const plugins = loadPlugins();

const vimeoApiUrl     = "https://api.vimeo.com";
const assetsServerUrl = "http://0.0.0.0:8001";

const serverHost = "0.0.0.0";
const serverPort = process.env.PORT || 8000;
const serverUrl  = `http://${ serverHost }:${ serverPort }`;

/* eslint-disable max-len */
const help = helpMultiline([
    "─┬ Starts an http server at " + helpLink(serverUrl),
    " ├─ files under " + helpPath(localLocations.dirs.dist.root) + " are served directly",
    " ├─ requests to " + helpLink(serverUrl + remoteLocations.paths.vimeoApi) + " are redirected to " + helpLink(vimeoApiUrl),
    " └┬ if " + helpEnvVar("NODE_ENV", "development"),
    "  └─ requests to " + helpLink(serverUrl + remoteLocations.paths.assets) + " are redirected to " + helpLink(assetsServerUrl)
]);
/* eslint-enable */

gulp.task("server", help, () => {

    const proxies = [
        {
            source : remoteLocations.paths.vimeoApi,
            target : vimeoApiUrl,
            options: {
                headers: {
                    Authorization: "Bearer " + process.env.APP_TOKEN
                }
            }
        }
    ];

    if (environment.isDevelopment) {
        proxies.push({
            source: remoteLocations.paths.assets,
            target: assetsServerUrl
        });
    }

    return gulp.src(localLocations.dirs.dist.root)
        .pipe(plugins.webserver({
            proxies,

            fallback  : "index.html",
            livereload: environment.isDevelopment,
            path      : remoteLocations.paths.base,
            host      : serverHost,
            port      : serverPort
        }));
});
