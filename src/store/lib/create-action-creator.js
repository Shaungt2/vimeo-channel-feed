import { createAction } from "redux-actions";

import defineConstant from "lib/define-constant";

function extractPayload(payload) {

    return payload;
}

function extractMetadata(payload, metadata) {

    return metadata;
}

export default function createActionCreator(type) {

    const actionCreator = createAction(
        type,
        extractPayload,
        extractMetadata
    );

    defineConstant(actionCreator, "TYPE", type);

    return actionCreator;
}
