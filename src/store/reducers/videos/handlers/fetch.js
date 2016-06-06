import Immutable from "immutable";

import videosFetchAction from "store/actions/videos/fetch";

import channelInitialState from "../initial-state/channel";

function getChannelState(state, channel, page) {

    const channelState = state.getIn([ "byChannel", channel ]);

    if (!channelState) {
        return channelInitialState;
    }

    const pageDiff = page - channelState.get("currentPage");

    return pageDiff !== 0 && pageDiff !== 1 ?
        channelInitialState :
        channelState;
}

export default {
    [videosFetchAction.TYPE_STARTED]: (
        state,
        { payload: { channel, page } }
    ) => state.setIn(
        [ "byChannel", channel ],
        getChannelState(state, channel, page).merge({ // eslint-disable-line
            error    : null,
            isLoading: true
        })
    ),

    [videosFetchAction.TYPE_FAILED]: (
        state,
        { payload: error, meta: { params } }
    ) => state.mergeDeep({
        byChannel: {
            [params.channel]: {
                error    : error.message,
                isLoading: false
            }
        }
    }),

    [videosFetchAction.TYPE_SUCCEED]: (
        state,
        { payload: result, meta: { params } }
    ) => state.mergeDeep({
        byChannel: {
            [params.channel]: {
                currentPage: params.page,
                isLoading  : false,
                total      : result.total,
                collection : state
                    .getIn([ "byChannel", params.channel, "collection" ])
                    .concat(Immutable.fromJS(result.videos))
            }
        }
    })
};
