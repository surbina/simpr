import React, { Component } from 'react';
import { connect } from 'react-redux';
import TreeView from '../tree-view';
import TreeFilter from '../tree-filter';
import locationHelper from '../../location.helper';

import { processTreeData } from './tree-helper';
import { fireFetchTree } from '../../store/pull-request/actions';
import { fireUpdateTreeFilter } from '../../store/tree-filter/actions';
import { fireUpdateNodeToggleStatus } from '../store/tree/actions';

class TreeViewContainer extends Component {
    constructor(props) {
        super(props);

        this.onFilterChange = this.onFilterChange.bind(this);
        this.onToggleChange = this.onToggleChange.bind(this);
    }

    componentDidMount() {
        this.props.fireFetchTree(locationHelper.getPRNumber(), this.props.baseUrl, this.props.authToken);
    }

    onFilterChange(filter) {
        this.props.fireUpdateTreeFilter(filter);
    }

    onToggleChange(path, toggled) {
        this.props.fireUpdateNodeToggleStatus(path, toggled);
    }

    render() {
        return (
            <div>
                <TreeFilter
                    showOnlyModifiedFiles={ this.props.treeFilter.showOnlyModifiedFiles }
                    handlerFilterChange={ this.onFilterChange } />
                <TreeView
                    treeData={ this.props.treeData }
                    handleToggleChange={ this.onToggleChange } />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const rawTreeData = state.pullRequest.treeData;
    const prFiles = state.pullRequest.prFiles;

    const treeData = rawTreeData && prFiles ?
        processTreeData(rawTreeData, prFiles, state.tree, state.treeFilter) :
        {
            name: locationHelper.getRepoName(),
            children: [],
            toggled: true,
            active: true,
            loading: true,
        };

    return {
        treeData,
        extensionOptionsLoaded: state.options.loaded,
        baseUrl: state.options.url,
        authToken: state.options.token,
        treeFilter: state.treeFilter,
    };
};

export default connect(mapStateToProps, {
    fireFetchTree,
    fireUpdateTreeFilter,
    fireUpdateNodeToggleStatus,
})(TreeViewContainer);
