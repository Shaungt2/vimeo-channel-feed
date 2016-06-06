import redirectToChildRoute from "lib/redirect-to-child-route";

import videosRoute from "pages/videos/route";

const THIS_PATH = "/";

export default {
    path       : THIS_PATH,
    childRoutes: [
        videosRoute
    ],

    getComponent(location, callback) {

        require.ensure(
            [],
            require => callback(null, require("./index").default),
            "application"
        );
    },

    onEnter({ location }, replaceLocation) {

        redirectToChildRoute(
            THIS_PATH,
            videosRoute,
            location,
            replaceLocation
        );
    }
};
