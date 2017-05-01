import React, { Component } from 'react';
import TreeView from '../tree-view';

import './explorer.scss';

class Explorer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="simpr-explorer">
                <div className="simpr-explorer__menu">
                    Buttons here!
                </div>
                <div className="simpr-explorer__panel">
                    <TreeView />
                </div>
            </div>
        );
    }
}
export default Explorer;
