export default function videosByChannelSelector(state) {

    return state.getIn([ "videos", "byChannel" ]);
}
