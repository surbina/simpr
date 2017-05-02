import React, { Component } from 'react';
import { connect } from 'react-redux';
import TreeView from '../tree-view';

import {
    fireFetchTree
} from '../../actions';

class TreeViewContainer extends Component {
    componentDidMount() {
        this.props.fireFetchTree();
    }

    render() {
        return (
            <TreeView tree={ this.props.tree } />
        );
    };
}

const mapStateToProps = (state) => {
    return {
        tree: state.tree.treeData
    };
};

export default connect(mapStateToProps, { fireFetchTree })(TreeViewContainer);