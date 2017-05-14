import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import TreeView from '../tree-view/index';
import locationHelper from '../../location.helper';

import {
    fireFetchTree
} from '../../store/pull-request/actions';

export const LEAF_TYPE = 'blob';
export const TREE_TYPE = 'tree';

export const FILE_STATUS_UNMODIFIED = 'unmodified';
export const FILE_STATUS_MODIFIED = 'modified';
export const FILE_STATUS_REMOVED = 'removed';
export const FILE_STATUS_ADDED = 'added';

class TreeViewContainer extends Component {
    componentDidMount() {
        this.props.fireFetchTree(locationHelper.getPRNumber(), this.props.baseUrl, this.props.authToken);
    }

    render() {
        return (
            <TreeView treeData={ this.props.treeData } />
        );
    };
}

const _processTreeData = (rawTreeData, prFiles) => {
    const deletedFiles = map(prFiles)
        .filter((file) => file.status === FILE_STATUS_REMOVED)
        .map((file) => ({
            path: file.filename,
            sha: file.sha,
            type: LEAF_TYPE,
            raw_url: file.raw_url,
        }));
    const treeNodes = (rawTreeData || [])
        .concat(deletedFiles)
        .sort((nodeA, nodeB) => (
            nodeA.type === TREE_TYPE ? -1 :
                nodeB.type === TREE_TYPE ? 1 :
                    nodeA.path.localeCompare(nodeB.path)
        ));

    const tree = {
        name: locationHelper.getRepoName(),
        children: [],
        toggled: true,
        active: true,
        loading: !treeNodes.length,
    };


    treeNodes.forEach((treeNode) => {
        const path = treeNode.path.split('/');
        const status = prFiles[treeNode.path] ?
            prFiles[treeNode.path].status :
            FILE_STATUS_UNMODIFIED;
        const node = {
            ...treeNode,
            status,
        };

        _insertInTree(tree, path, node);
    });

    return tree;
};

const _insertInTree = (tree, path, node) => {
    path.forEach((subpath) => {
        let childInPath = tree.children.find((node) => node.name === subpath);

        if(!childInPath) {
            childInPath = {
                name: subpath,
                children: [],
                active: true,
            };

            tree.children.push(childInPath);
        }

        if(node.status !== FILE_STATUS_UNMODIFIED) {
            childInPath.status = childInPath.status === FILE_STATUS_REMOVED || childInPath.status === FILE_STATUS_ADDED ?
                childInPath.status :
                FILE_STATUS_MODIFIED;
        }

        tree = childInPath;
    });

    if(node.type === LEAF_TYPE) {
        delete tree.children;
    }

    Object.assign(tree, node);
};

const mapStateToProps = (state) => {
    const rawTreeData = state.pullRequest.treeData;
    const prFiles = state.pullRequest.prFiles;

    const treeData = rawTreeData && prFiles ?
        _processTreeData(rawTreeData, prFiles) :
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
    };
};

export default connect(mapStateToProps, { fireFetchTree })(TreeViewContainer);