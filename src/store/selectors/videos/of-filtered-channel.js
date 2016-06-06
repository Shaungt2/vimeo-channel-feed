import { createSelector } from "reselect";

import videosOfAllChannelsSelector from "./of-all-channels";
import videosFilterChannelSelector from "./filter-channel";

export default createSelector(
    videosOfAllChannelsSelector,
    videosFilterChannelSelector,
    (videosOfAllChannels, videosFilterChannel) =>
        videosOfAllChannels.get(videosFilterChannel)
);
