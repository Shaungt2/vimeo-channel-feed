import { compose } from "redux";

import appliedMiddlewares from "./middlewares";
import enhacers from "./enhacers";

export default compose(
    appliedMiddlewares,
    ...enhacers
);
