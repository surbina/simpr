import { map } from 'lodash';
import locationHelper from '../../location.helper';

export const LEAF_TYPE = 'blob';
export const TREE_TYPE = 'tree';

export const FILE_STATUS_UNMODIFIED = 'unmodified';
export const FILE_STATUS_MODIFIED = 'modified';
export const FILE_STATUS_REMOVED = 'removed';
export const FILE_STATUS_ADDED = 'added';

export const processTreeData = (rawTreeData, prFiles, treeState, treeFilter) => {
    const treeNodes = getTreeNodes(rawTreeData, prFiles, treeFilter);

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

        insertInTree(tree, path, node, treeState);
    });

    return tree;
};

const getTreeNodes = (rawTreeData, prFiles, treeFilter) => {
    let treeNodes;
    const modifiedFiles = map(prFiles, (file) => ({
        path: file.filename,
        sha: file.sha,
        type: LEAF_TYPE,
        raw_url: file.raw_url,
        status: file.status,
    })).sort((fileA, fileB) => (
        fileA.path.split('/').length === fileB.path.split('/').length
            ? fileA.path.localeCompare(fileB.path)
            : fileA.path.split('/').length > fileB.path.split('/').length
            ? -1
            : 1
    ));

    if(treeFilter.showOnlyModifiedFiles) {
        treeNodes = modifiedFiles;
    } else {
        const deletedFiles = modifiedFiles.filter((file) => file.status === FILE_STATUS_REMOVED);

        treeNodes = (rawTreeData || [])
            .concat(deletedFiles)
            .sort((nodeA, nodeB) => (
                nodeA.type === nodeB.type
                    ? nodeA.path.localeCompare(nodeB.path)
                    : nodeA.type === TREE_TYPE
                    ? -1
                    : 1
            ));
    }

    return treeNodes;
};

const insertInTree = (tree, path, node, treeState) => {
    let partialPath = '';

    path.forEach((subpath) => {
        partialPath = partialPath + subpath;
        let childInPath = tree.children.find((node) => node.name === subpath);

        if(!childInPath) {
            childInPath = {
                name: subpath,
                children: [],
                active: true,
                path: partialPath,
                toggled: !!treeState[partialPath],
            };

            tree.children.push(childInPath);
        }

        if(node.status !== FILE_STATUS_UNMODIFIED) {
            childInPath.status = childInPath.status === FILE_STATUS_REMOVED || childInPath.status === FILE_STATUS_ADDED ?
                childInPath.status :
                FILE_STATUS_MODIFIED;
        }

        tree = childInPath;
        partialPath = partialPath + '/';
    });

    if(node.type === LEAF_TYPE) {
        delete tree.children;
        delete tree.toggled;
    }

    Object.assign(tree, node);
};