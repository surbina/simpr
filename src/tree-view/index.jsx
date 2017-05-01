import React, {Component} from 'react';
import {render} from 'react-dom';

class TreeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                This is a tree view
            </div>
        );
    }
}

const body = document.getElementsByTagName('body')[0];
const treeViewContainer = document.createElement('div');

body.appendChild(treeViewContainer);

render(<TreeView />, treeViewContainer);