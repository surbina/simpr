import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Explorer from '../explorer/index';

import { fireToggleExplorer } from '../store/actions';

class ExplorerContainer extends Component {
    render() {
        return(
            <Explorer
                isOpen={ this.props.isOpen }
                onToggleExplorer={ () => { this.props.fireToggleExplorer() } } />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.explorer.isOpen,
    };
};

export default withRouter(connect(mapStateToProps, { fireToggleExplorer })(ExplorerContainer));
