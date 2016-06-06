import store from "store";
import videosFilterSelector from "store/selectors/videos/filter";
import videosFetchAction from "store/actions/videos/fetch";

export default {
    path: "list",

    getComponent(location, callback) {

        require.ensure(
            [],
            require => callback(null, require("./index").default),
            "videos-list"
        );
    },

    onEnter() {

        const filter = videosFilterSelector(
            store.getState()
        );

        store.dispatch(
            videosFetchAction({
                channel : filter.get("channel"),
                page    : 1,
                pageSize: filter.get("pageSize")
            })
        );
    }
};
