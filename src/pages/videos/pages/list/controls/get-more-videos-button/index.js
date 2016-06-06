import React, {
    Component,
    PropTypes
} from "react";

import styles from "./index.css";

export default class GetMoreVideosButton extends Component {

    static propTypes = {
        areFiltered      : PropTypes.bool.isRequired,
        onClick          : PropTypes.func.isRequired,
        totalActualVideos: PropTypes.number.isRequired,
        totalAllVideos   : PropTypes.number.isRequired
    };

    _renderInfo() {

        const filtered = this.props.areFiltered ?
            "- filtered" :
            "";

        const {
            totalActualVideos: actual,
            totalAllVideos   : all
        } = this.props;

        return (
            <span className={ styles.info }>
                { `(viewing ${ actual } of ${ all } ${ filtered })` }
            </span>
        );
    }

    _renderLink() {

        return (
            <a
                className={ styles.link }
                href="#"
                onClick={ this.props.onClick }
            >view more</a>
        );
    }

    render() {

        return (
            <div className={ styles.component }>
                { this._renderLink() }
                { this._renderInfo() }
            </div>
        );
    }
}
