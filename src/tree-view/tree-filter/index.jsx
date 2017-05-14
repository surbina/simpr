import React, { Component } from 'react';

class TreeFilter extends Component {
    constructor(props) {
        super(props);

        this.handleShowOnlyModifiedFilesChange = this.handleShowOnlyModifiedFilesChange.bind(this);
    }

    handleShowOnlyModifiedFilesChange(event) {
        this.props.handlerFilterChange({
            showOnlyModifiedFiles: event.target.checked,
        });
    }

    render() {
        return(
            <div>
                <label>
                    <input
                        name="showOnlyModifiedFiles"
                        type="checkbox"
                        checked={ this.props.showOnlyModifiedFiles }
                        onChange={ this.handleShowOnlyModifiedFilesChange } />
                    Show only modified files
                </label>
            </div>
        );
    }
}

export default TreeFilter;