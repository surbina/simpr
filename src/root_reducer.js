import { combineReducers } from 'redux';

import explorer from './explorer/reducer';
import tree from './tree-view/reducer';

export default combineReducers({
    explorer,
    tree,
});