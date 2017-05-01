import React, { Component } from 'react';
import { connect } from 'react-redux';
import Explorer from '../explorer';

import { fireToggleExplorer } from '../../actions';

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

export default connect(mapStateToProps, { fireToggleExplorer })(ExplorerContainer);