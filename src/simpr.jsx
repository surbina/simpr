import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import root_reducer from './root_reducer';
import ExplorerContainer from './explorer/explorer-container';

let store = createStore(
    root_reducer,
    applyMiddleware(thunk, createLogger({ collapsed: true }))
);

const body = document.getElementsByTagName('body')[0];
const treeViewContainer = document.createElement('div');

body.appendChild(treeViewContainer);

render(
    <Provider store={ store }>
        <Router>
            <Route path="/:owner/:repo/pull/:prId/files" component={ ExplorerContainer } />
        </Router>
    </Provider>,
    treeViewContainer
);
