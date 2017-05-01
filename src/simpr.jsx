import React from 'react';
import { render } from 'react-dom';
import Explorer from './explorer';

import './base.scss';

const body = document.getElementsByTagName('body')[0];
const treeViewContainer = document.createElement('div');

body.appendChild(treeViewContainer);

render(<Explorer />, treeViewContainer);
