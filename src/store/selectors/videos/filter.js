export default function videosFilterSelector(state) {

    return state.getIn([ "videos", "filter" ]);
}
