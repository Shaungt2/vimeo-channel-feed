import { createReducer } from "redux-immutablejs";

import handlers from "./handlers";
import initialState from "./initial-state";

export default createReducer(
    initialState,
    handlers
);
