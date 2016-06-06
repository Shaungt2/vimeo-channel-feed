import { createSelector } from "reselect";

import videosFilterSelector from "./filter";

export default createSelector(
    videosFilterSelector,
    filter => filter.get("channel")
);
