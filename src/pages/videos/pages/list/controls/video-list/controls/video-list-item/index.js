import Immutable from "immutable";
import React, {
    Component,
    PropTypes
} from "react";

import TextLinesLimiter from "controls/text-lines-limiter";

import getPictureSmallerThan from "./lib/get-picture-smaller-than";
import defaultUserPic from "./assets/images/default-user-pic-300x300.png";

import styles from "./index.css";

export default class VideoListItem extends Component {

    static propTypes = {
        descriptionClassName : PropTypes.string,
        descriptionLineHeight: PropTypes.number,
        descriptionMaxLines  : PropTypes.number,
        nameClassName        : PropTypes.string,
        nameLineHeight       : PropTypes.number,
        nameMaxLines         : PropTypes.number,
        sizeUnit             : PropTypes.string,
        video                : PropTypes.instanceOf(Immutable.Map).isRequired
    };

    static defaultProps = {
        descriptionLineHeight: 1.2,
        sizeUnit             : "em",
        nameLineHeight       : 1.5
    };

    _getUserPictureUrl() {

        const userPictures = this.props.video.getIn([
            "user",
            "pictures",
            "sizes"
        ]);

        return userPictures ?
            getPictureSmallerThan(100, userPictures)
                .get("link") :
            undefined;
    }

    _getVideoConnections() {

        return this.props.video.getIn([ "metadata", "connections" ]);
    }

    _renderVideoStatsLikes() {

        const likes = this
            ._getVideoConnections()
            .getIn([ "likes", "total" ]);

        return (
            <span
                className={ styles.videoStatsItem }
            >{ likes } likes</span>
        );
    }

    _renderVideoStatsComments() {

        const comments = this
            ._getVideoConnections()
            .getIn([ "comments", "total" ]);

        return (
            <span
                className={ styles.videoStatsItem }
            >{ comments } comments</span>
        );
    }

    _renderVideoStatsPlays() {

        const plays = this.props.video.getIn([
            "stats",
            "plays"
        ]);

        return (
            <span
                className={ styles.videoStatsItem }
            >{ plays } plays</span>
        );
    }

    _renderVideoStats() {

        return (
            <div className={ styles.videoStats }>
                { this._renderVideoStatsPlays() }
                { this._renderVideoStatsLikes() }
                { this._renderVideoStatsComments() }
            </div>
        );
    }

    _renderVideoDescription() {

        const description = this.props.video.get("description");

        if (!description) {
            return null;
        }

        return (
            <TextLinesLimiter
                className={ styles.videoDescription }
                lineHeight={ this.props.descriptionLineHeight }
                markerClassName={ styles.textLimitMarker }
                maxLines={ 3 }
                sizeUnit={ this.props.sizeUnit }
            >
                { description }
            </TextLinesLimiter>
        );
    }

    _renderVideoName() {

        const { video } = this.props;
        const videoName = video.get("name");

        return (
            <div className={ styles.videoNameContainer }>
                <a
                    className={ styles.videoNameLink }
                    href={ video.get("link") }
                    title={ videoName }
                >
                    <strong className={ styles.videoName }>
                        { videoName }
                    </strong>
                </a>
            </div>
        );
    }

    _renderVideoInfo() {

        return (
            <div className={ styles.videoInfo }>
                { this._renderVideoName() }
                { this._renderVideoDescription() }
            </div>
        );
    }

    _renderUserPictureOrDefault() {

        const user = this.props.video.get("user");

        const userPictureUrl = this._getUserPictureUrl();

        return (
            <a
                className={ styles.userPictureLink }
                href={ user.get("link") }
                title={ user.get("name") }
            >
                <img
                    className={ styles.userPicture }
                    src={ userPictureUrl || defaultUserPic }
                />
            </a>
        );
    }

    render() {

        return (
            <li className={ styles.component }>
                { this._renderUserPictureOrDefault() }
                { this._renderVideoInfo() }
                { this._renderVideoStats() }
            </li>
        );
    }
}
