import React, { Component } from 'react';

import './tree-view.scss';

class TreeView extends Component {
    getTreeData() {
        return this.props.tree || [];
    }

    render() {
        return (
            <div className="simpr-tree-view__container">
                This is a tree view
                {this.getTreeData().map(treeNode =>
                    <div key={ treeNode.path }>{treeNode.path}</div>
                )}
            </div>
        );
    }
}
export default TreeView;
