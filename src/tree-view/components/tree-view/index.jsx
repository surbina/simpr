import React, { Component } from 'react';
import { Treebeard, decorators, theme } from 'react-treebeard';

import customDecorators from '../decorators';
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

        this.decorators = Object.assign({}, decorators, customDecorators);

        this.resetStyles = Object.assign({}, theme);
        this.resetStyles.tree.base.backgroundColor = '';
        this.resetStyles.tree.base.color =  '';
        this.resetStyles.tree.node.activeLink.background = '';
        this.resetStyles.tree.node.loading.color = '';
        this.resetStyles.tree.node.header.base.color = '';
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
                    decorators={ this.decorators }
                    styles={ this.resetStyles }
                />
            </div>
        );
    }
}
export default TreeView;
