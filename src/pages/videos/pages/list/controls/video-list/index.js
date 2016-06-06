import classNames from "classnames";
import Immutable from "immutable";
import React, {
    Component,
    PropTypes
} from "react";

import VideoListItem from "./controls/video-list-item";

import styles from "./index.css";

export default class VideoList extends Component {

    static propTypes = {
        className: PropTypes.string,
        videos   : PropTypes.instanceOf(Immutable.List).isRequired
    };

    _renderItems() {

        return this.props.videos.map((video, key) => (
            <VideoListItem
                key={ key }
                video={ video }
            />
        ));
    }

    render() {

        return (
            <ol
                className={ classNames(
                    styles.component,
                    this.props.className
                ) }
            >
                { this._renderItems() }
            </ol>
        );
    }
}
