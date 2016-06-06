import redirectToChildRoute from "lib/redirect-to-child-route";

import videosListRoute from "./pages/list/route";

const THIS_PATH = "videos";

export default {
    path: THIS_PATH,

    childRoutes: [
        videosListRoute
    ],

    onEnter({ location }, replaceLocation) {

        redirectToChildRoute(
            THIS_PATH,
            videosListRoute,
            location,
            replaceLocation
        );
    }
};
