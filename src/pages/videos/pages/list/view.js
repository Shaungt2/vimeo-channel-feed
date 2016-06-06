import classNames from "classnames";
import Immutable from "immutable";
import React, {
    Component,
    PropTypes
} from "react";
import { autobind } from "core-decorators";

import GetMoreVideosButton from "./controls/get-more-videos-button";
import VideoFilter from "./controls/video-filter";
import VideoList from "./controls/video-list";

import vimeoLogo from "./assets/images/vimeo-logo-256x256.png";

import styles from "./view.css";

const ERROR_LOADING_VIDEOS_FAILED =
    "There was an error encountered while loading the videos";

export default class VideosListPageView extends Component {

    static propTypes = {
        areFiltered   : PropTypes.bool.isRequired,
        error         : PropTypes.string,
        filter        : PropTypes.instanceOf(Immutable.Map).isRequired,
        isLoading     : PropTypes.bool.isRequired,
        onFilterChange: PropTypes.func.isRequired,
        onMoreVideos  : PropTypes.func,
        videos        : PropTypes.instanceOf(Immutable.List).isRequired,
        videosTotal   : PropTypes.number.isRequired
    };

    state = {
        showErrorToastIfError: true
    };

    componentWillReceiveProps({ error }) {

        if (!error) {
            this._setShowErrorToastIfError(true);
        }
    }

    _setShowErrorToastIfError(show) {

        this.setState({
            showErrorToastIfError: show
        });
    }

    @autobind
    _handleGetMoreVideosClick(event) {

        event.preventDefault();

        this.props.onMoreVideos();
    }

    _renderGetMoreVideosButton() {

        return (
            <GetMoreVideosButton
                areFiltered={ this.props.areFiltered }
                onClick={ this._handleGetMoreVideosClick }
                totalActualVideos={ this.props.videos.count() }
                totalAllVideos={ this.props.videosTotal }
            />
        );
    }

    _renderGetMoreVideosLoading() {

        return (
            <div className={ styles.getMoreVideosLoading }>loading more...</div>
        );
    }

    _renderGetMoreVideos() {

        if (!this.props.onMoreVideos) {
            return null;
        }

        const content = this.props.isLoading ?
            this._renderGetMoreVideosLoading() :
            this._renderGetMoreVideosButton();

        return (
            <div className={ styles.getMoreVideos }>{ content }</div>
        );
    }

    _renderVideoList() {

        if (this.props.videos.count() === 0) {
            return null;
        }

        return (
            <VideoList videos={ this.props.videos }/>
        );
    }

    _renderErrorPage() {

        return (
            <div
                className={ classNames(
                    styles.content,
                    styles.error
                ) }
            >
                <p className={ styles.errorTitle }>Sorry</p>
                <p
                    className={ styles.errorExplanation }
                >{ ERROR_LOADING_VIDEOS_FAILED }</p>
            </div>
        );
    }

    _renderErrorToast() {

        if (!this.state.showErrorToastIfError) {
            return null;
        }

        setTimeout(
            () => this._setShowErrorToastIfError(false),
            2500
        );

        return (
            <div
                className={ styles.errorToast }
            >
                <strong className={ styles.errorToastTitle }>Error</strong>
                <p
                    className={ styles.errorToastMessage }
                >{ ERROR_LOADING_VIDEOS_FAILED }</p>
            </div>
        );
    }

    _renderContent() {

        return (
            <div className={ styles.content }>
                { this._renderVideoList() }
                { this._renderGetMoreVideos() }
            </div>
        );
    }

    _renderError() {

        if (!this.props.error) {
            return null;
        }

        return this.props.videosTotal > 0 ?
            this._renderErrorToast() :
            this._renderErrorPage();
    }

    _renderVideoFilter() {

        return (
            <VideoFilter
                filter={ this.props.filter }
                onChange={ this.props.onFilterChange }
            />
        );
    }

    _renderLoading() {

        if (!this.props.isLoading) {
            return null;
        }

        return (
            <img
                className={ styles.loading }
                src={ vimeoLogo }
            />
        );
    }

    render() {

        return (
            <div className={ styles.component }>
                <div className={ styles.page }>
                    { this._renderLoading() }
                    { this._renderVideoFilter() }
                    { this._renderError() }
                    { this._renderContent() }
                </div>
            </div>
        );
    }
}
