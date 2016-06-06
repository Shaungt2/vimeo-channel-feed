import classNames from "classnames";
import React, {
    Component,
    PropTypes
} from "react";

import styles from "./index.css";

export default class TextLinesLimiter extends Component {

    static propTypes = {
        children       : PropTypes.node.isRequired,
        className      : PropTypes.string,
        lineHeight     : PropTypes.number.isRequired,
        markerClassName: PropTypes.string,
        markerContent  : PropTypes.node,
        maxLines       : PropTypes.number.isRequired,
        sizeUnit       : PropTypes.string.isRequired
    };

    static defaultProps = {
        ellipsisContent: null
    };

    _renderMarker() {

        const {
            lineHeight,
            maxLines,
            sizeUnit
        } = this.props;

        const style = {
            height: lineHeight + sizeUnit,
            top   : (maxLines - 1) * lineHeight + sizeUnit
        };

        return (
            <div
                className={ classNames(
                    styles.marker,
                    this.props.markerClassName
                ) }
                style={ style }
            />
        );
    }

    render() {

        const {
            lineHeight,
            maxLines,
            sizeUnit
        } = this.props;

        const style = {
            lineHeight: lineHeight + sizeUnit,
            maxHeight : maxLines * lineHeight + sizeUnit
        };

        return (
            <div
                className={ classNames(
                    styles.component,
                    this.props.className
                ) }
                style={ style }
            >
                { this.props.children }
                { this._renderMarker() }
            </div>
        );
    }
}
