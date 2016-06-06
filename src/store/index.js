import { createStore } from "redux";

import combinedReducers from "./reducers";
import composedComposables from "./composables";
import initialState from "./initial-state";

export default createStore(
    combinedReducers,
    initialState,
    composedComposables
);
