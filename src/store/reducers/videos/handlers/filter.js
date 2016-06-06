import Immutable from "immutable";

import videosFilterAction from "store/actions/videos/filter";

import channelInitialState from "../initial-state/channel";

export default {
    [videosFilterAction.TYPE]: (state, { payload: filter }) => {

        const newState = state.set("filter", Immutable.fromJS(filter));

        return filter.pageSize === state.getIn([ "filter", "pageSize" ]) ?
            newState :
            newState.setIn(
                [ "byChannel", filter.channel ],
                channelInitialState
            );

    }
};
