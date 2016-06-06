import Immutable from "immutable";

export default Immutable.fromJS({
    byChannel: {},
    channels : [ "top" ],
    filter   : {
        channel    : "top",
        description: "",
        minLikes   : 0,
        pageSize   : 10
    }
});
