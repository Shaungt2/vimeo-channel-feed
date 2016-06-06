import React, {
    Component,
    PropTypes
} from "react";
import { Provider } from "react-redux";

import store from "store";

export default class Application extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {

        return (
            <Provider store={ store }>
                { this.props.children }
            </Provider>
        );
    }
}
