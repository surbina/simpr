import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import TreeView from '../tree-view';
import locationHelper from '../../../location.helper';

import {
    fireFetchTree
} from '../../actions';

const LEAF_TYPE = 'blob';
const TREE_TYPE = 'tree';

const FILE_STATUS_UNMODIFIED = 'unmodified';
const FILE_STATUS_MODIFIED = 'modified';
const FILE_STATUS_REMOVED = 'removed';
const FILE_STATUS_ADDED = 'added';

class TreeViewContainer extends Component {
    componentDidMount() {
        this.props.fireFetchTree(locationHelper.getPRNumber());
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
    const rawTreeData = state.tree.treeData;
    const prFiles = state.tree.prFiles;

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
    };
};

export default connect(mapStateToProps, { fireFetchTree })(TreeViewContainer);