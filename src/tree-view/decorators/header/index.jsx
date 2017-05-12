import React, { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';

import {
    FILE_STATUS_UNMODIFIED,
    LEAF_TYPE,
} from '../../tree-view-container/index';

import './header.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleFileClick = this.handleFileClick.bind(this);
    }

    handleFileClick() {
        const node = this.props.node;
        if(node.status !== FILE_STATUS_UNMODIFIED) {
            const path = `div[data-path='${node.path}']`;

            const diffHeader = document.querySelector(path);
            diffHeader.scrollIntoView();
        } else {
            window.open(`${this.props.prHtmlUrl}/${node.type}/${this.props.prRef}/${node.path}`,'_blank');
        }
    }

    folderItem(name) {
        return(
            <span className="simpr-tree-view__header__label">{name}</span>
        );
    }

    fileItem(name) {
        return(
            <span
                className="simpr-tree-view__header__label"
                onClick={ this.handleFileClick }>{name}</span>
        );
    }

    render() {
        const node = this.props.node;
        const headerClassNames = className({
            'simpr-tree-view__header': true,
            [`simpr-tree-view__header--${node.status}`]: true,
        });

        return (
            <div className={ headerClassNames }>
                { node.type === LEAF_TYPE ?
                    this.fileItem(node.name) :
                    this.folderItem(node.name) }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    prRef: state.pullRequest.prRef,
    prHtmlUrl: state.pullRequest.prHtmlUrl,
});

export default connect(mapStateToProps)(Header);
