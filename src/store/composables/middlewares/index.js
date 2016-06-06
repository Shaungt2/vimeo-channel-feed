import { applyMiddleware } from "redux";

import loggerMiddleware from "./logger";
import thunkMiddleware from "./thunk";

const middlewares = [
    thunkMiddleware,
    loggerMiddleware
].filter(Boolean);

export default applyMiddleware(...middlewares);
