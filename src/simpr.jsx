import React from 'react';
import { render } from 'react-dom';
import TreeView from './tree-view';

const body = document.getElementsByTagName('body')[0];
const treeViewContainer = document.createElement('div');

body.appendChild(treeViewContainer);

render(<TreeView />, treeViewContainer);