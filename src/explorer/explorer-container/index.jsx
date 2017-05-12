import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
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
    };
};

export default withRouter(connect(mapStateToProps, {
    fireToggleExplorer,
    fireFetchOptions,
})(ExplorerContainer));
