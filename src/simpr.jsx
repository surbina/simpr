import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import root_reducer from './root_reducer';
import ExplorerContainer from './explorer/components/explorer-container';

import './base.scss';

let store = createStore(
    root_reducer,
    applyMiddleware(thunk)
);

const body = document.getElementsByTagName('body')[0];
const treeViewContainer = document.createElement('div');

body.appendChild(treeViewContainer);

const toggleExplorerHandler = () => {
    const isExplorerOpen = store.getState().explorer.isOpen;
    body.className = isExplorerOpen ? 'simpr-body--open-explorer' : '';
};

store.subscribe(toggleExplorerHandler);

render(
    <Provider store={ store }>
        <ExplorerContainer />
    </Provider>,
    treeViewContainer
);
