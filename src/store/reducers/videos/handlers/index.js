import videosFetchHandlers from "./fetch";
import videosFilterHandlers from "./filter";

export default Object.assign(
    {},
    videosFetchHandlers,
    videosFilterHandlers
);
