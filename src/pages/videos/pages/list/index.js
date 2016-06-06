import { connect } from "react-redux";

import videosFetchAction from "store/actions/videos/fetch";
import videosFilterAction from "store/actions/videos/filter";
import videosFilteredSelector from "store/selectors/videos/filtered";
import videosFilterSelector from "store/selectors/videos/filter";
import videosOfFilteredChannelSelector
    from "store/selectors/videos/of-filtered-channel";

import VideosListPageView from "./view";

function areVideosFiltered(filter) {

    return (
        Boolean(filter.get("description"))
        || filter.get("minLikes") > 0
    );
}

function getTotals(channelVideos) {

    return {
        actual: channelVideos.get("collection").count(), // eslint-disable-line
        all   : channelVideos.get("total")
    };
}

function fetchPage(dispatch, filter, page) {

    dispatch(
        videosFetchAction({
            page,
            channel : filter.get("channel"),
            pageSize: filter.get("pageSize")
        })
    );
}

function mergeProps({ state }, { dispatch }, props) {

    const filter        = videosFilterSelector(state);
    const channelVideos = videosOfFilteredChannelSelector(state);
    const isLoading     = channelVideos.get("isLoading");

    const totals = getTotals(channelVideos);

    const onMoreVideos = totals.actual < totals.all ?
        () => fetchPage(
            dispatch,
            filter,
            channelVideos.get("currentPage") + 1
        ) :
        undefined;

    return {
        ...props,

        filter,
        isLoading,
        onMoreVideos,

        areFiltered: areVideosFiltered(filter),
        error      : channelVideos.get("error"),
        videos     : videosFilteredSelector(state),
        videosTotal: totals.all,

        onFilterChange(updatedFilter) {

            const prevPageSize = filter.get("pageSize");

            dispatch(
                videosFilterAction(updatedFilter.toJS())
            );

            if (updatedFilter.get("pageSize") !== prevPageSize) {
                fetchPage(
                    dispatch,
                    updatedFilter,
                    1
                );
            }
        }
    };
}

export default connect(
    state => ({ state }),
    dispatch => ({ dispatch }),
    mergeProps
)(VideosListPageView);
