import { createSelector } from "reselect";

import videosOfFilteredChannelSelector from "./of-filtered-channel";
import videosFilterSelector from "./filter";

import filterWithDescription from "./filters/with-description";
import filterWithMinLikes from "./filters/with-min-likes";

const filterFns = [
    filterWithMinLikes,
    filterWithDescription
];

export default createSelector(
    videosOfFilteredChannelSelector,
    videosFilterSelector,
    (videosOfFilteredChannel, filter) => filterFns.reduce(
        (filtered, curFilterFn) => curFilterFn(filtered, filter),
        videosOfFilteredChannel.get("collection")
    )
);
