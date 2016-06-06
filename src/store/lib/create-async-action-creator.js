import createActionCreator from "./create-action-creator";
import defineConstant from "lib/define-constant";

export default function createAsyncActionCreator(
    TYPE,
    asyncTask
) {

    const TYPE_STARTED = TYPE + ".STARTED";
    const TYPE_FAILED  = TYPE + ".FAILED";
    const TYPE_SUCCEED = TYPE + ".SUCCEED";

    const actionCreators = {
        [TYPE_STARTED]: createActionCreator(TYPE_STARTED),
        [TYPE_FAILED] : createActionCreator(TYPE_FAILED),
        [TYPE_SUCCEED]: createActionCreator(TYPE_SUCCEED)
    };

    function create(payload, meta = {}) {

        return async (dispatch, getState) => {

            const initialMeta = {
                ...meta,
                params   : payload,
                startedAt: new Date()
            };

            dispatch(actionCreators[TYPE_STARTED](payload, initialMeta));

            try {
                const result = await asyncTask(payload, getState, dispatch);

                dispatch(actionCreators[TYPE_SUCCEED](result, {
                    ...initialMeta,
                    endedAt: new Date()
                }));

                return result;
            }
            catch (error) {
                dispatch(actionCreators[TYPE_FAILED](error, {
                    ...initialMeta,
                    endedAt: new Date()
                }));

                throw error;
            }
        };
    }

    Object
        .entries({
            TYPE_STARTED,
            TYPE_FAILED,
            TYPE_SUCCEED
        })
        .forEach(entry => defineConstant(create, ...entry));

    return create;
}
