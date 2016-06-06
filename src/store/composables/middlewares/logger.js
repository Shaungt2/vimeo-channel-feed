import createLoggerMiddleware from "redux-logger";

const loggerMiddleware = !__config.debug ?
    undefined :
    createLoggerMiddleware({
        stateTransformer(state) {

            return state.toJS();
        }
    });

export default loggerMiddleware;
