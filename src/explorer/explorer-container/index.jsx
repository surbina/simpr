import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import Explorer from '../explorer/index';

import { fireFetchOptions } from '../../store/options/actions';
import { fireToggleExplorer } from '../store/actions';

class ExplorerContainer extends Component {
    componentDidMount(){
        this.props.fireFetchOptions();
    }

    render() {
        return(
            <Explorer
                prData={ this.props.prData }
                extensionOptionsLoaded={ this.props.extensionOptionsLoaded }
                isOpen={ this.props.isOpen }
                onToggleExplorer={ () => { this.props.fireToggleExplorer() } } />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.explorer.isOpen,
        extensionOptionsLoaded: state.options.loaded,
        prData: {
            id: get(state.pullRequest, 'prId', ''),
            branch: get(state.pullRequest, 'prRef', ''),
            title: get(state.pullRequest, 'prTitle', ''),
        },
    };
};

export default withRouter(connect(mapStateToProps, {
    fireToggleExplorer,
    fireFetchOptions,
})(ExplorerContainer));
