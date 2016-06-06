import classNames from "classnames";
import Immutable from "immutable";
import React, {
    Component,
    PropTypes
} from "react";
import { autobind } from "core-decorators";
import FaIcon from "react-fa";

import styles from "./index.css";

export default class VideoFilter extends Component {

    static propTypes = {
        className      : PropTypes.string,
        filter         : PropTypes.instanceOf(Immutable.Map).isRequired,
        onChange       : PropTypes.func.isRequired,
        pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
    };

    static defaultProps = {
        get pageSizeOptions() {

            return [ 10, 25, 50 ];
        }
    };

    state = {
        isVisible: false
    };

    @autobind
    _handlePageSizeChange(event) {

        this.props.onChange(
            this.props.filter.set(
                "pageSize",
                Number(event.target.value)
            )
        );
    }

    @autobind
    _handleMinLikesChange(event) {

        const minLikes = Number(event.target.value);

        if (minLikes < 0 || !Number.isInteger(minLikes)) {
            return;
        }

        this.props.onChange(
            this.props.filter.set(
                "minLikes",
                minLikes
            )
        );
    }

    @autobind
    _handleDescriptionChange(event) {

        this.props.onChange(
            this.props.filter.set(
                "description",
                event.target.value
            )
        );
    }

    @autobind
    _handleTitleClick(event) {

        event.preventDefault();

        this.setState({
            visible: !this.state.visible
        });
    }

    _renderPageSizeSelectOptions() {

        return this.props.pageSizeOptions.map(
            (value, index) => (
                <option
                    key={ index }
                    value={ value }
                >{ value }</option>
            )
        );
    }

    _renderPageSizeSelect() {

        return (
            <label className={ styles.filterLabel }>
                <span
                    className={ styles.filterDescription }
                >VIDEOS PER PAGE</span>
                <select
                    onChange={ this._handlePageSizeChange }
                    value={ this.props.filter.get("pageSize") }
                >
                    { this._renderPageSizeSelectOptions() }
                </select>
            </label>
        );
    }

    _renderMinLikesInput() {

        return (
            <label className={ styles.filterLabel }>
                <span
                    className={ styles.filterDescription }
                >MINIMUM LIKES</span>
                <input
                    className={ styles.filterInput }
                    name="description"
                    onChange={ this._handleMinLikesChange }
                    type="number"
                    value={ this.props.filter.get("minLikes") }
                />
            </label>
        );
    }

    _renderDescriptionInput() {

        return (
            <label className={ styles.filterLabel }>
                <span className={ styles.filterDescription }>DESCRIPTION</span>
                <input
                    className={ styles.filterInput }
                    name="description"
                    onChange={ this._handleDescriptionChange }
                    type="text"
                    value={ this.props.filter.get("description") }
                />
            </label>
        );
    }

    _renderVisibilityStateIcon() {

        const name = this.state.visible ?
            "chevron-down" :
            "chevron-right";

        return (
            <FaIcon
                className={ styles.visibilityStateIcon }
                name={ name }
            />
        );
    }

    _renderContent() {

        if (!this.state.visible) {
            return null;
        }

        return (
            <div>
                { this._renderDescriptionInput() }
                { this._renderMinLikesInput() }
                { this._renderPageSizeSelect() }
            </div>
        );
    }

    _renderTitle() {

        return (
            <a
                className={ styles.title }
                href="#"
                onClick={ this._handleTitleClick }
            >
                <strong className={ styles.titleText }>Filter</strong>
                { this._renderVisibilityStateIcon() }
            </a>
        );
    }

    render() {

        return (
            <div
                className={ classNames(
                    styles.component,
                    this.props.className
                ) }
            >
                { this._renderTitle() }
                { this._renderContent() }
            </div>
        );
    }
}
