import createAsyncActionCreator from "store/lib/create-async-action-creator";
import { getJson } from "lib/request";

export async function videosFetch({ channel, page, pageSize }) {

    const endpoint = `/vimeo/channels/${ channel }/videos`;

    const { content: response } = await getJson(endpoint, {
        page,
        direction: "desc",
        per_page : pageSize, // eslint-disable-line
        sort     : "likes"
    });

    return {
        page  : response.page,
        total : response.total,
        videos: response.data
    };
}

export default createAsyncActionCreator(
    "VIDEOS/FETCH",
    videosFetch
);
