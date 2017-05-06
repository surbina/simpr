import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import locationHelper from '../../../location.helper';

import './tree-view.scss';

class TreeView extends Component {
    constructor(props){
        super(props);
        this.state = {
            treeData: {
                name: locationHelper.getRepoName(),
                children: [],
                toggled: true,
                active: true,
                loading: true,
            },
        };
        this.onToggle = this.onToggle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            treeData: nextProps.treeData,
        });
    }

    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    render() {
        return (
            <div className="simpr-tree-view__container">
                <Treebeard
                    data={ this.state.treeData }
                    onToggle={ this.onToggle }
                />
            </div>
        );
    }
}
export default TreeView;
