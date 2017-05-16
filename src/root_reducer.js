import { combineReducers } from 'redux';

import explorer from './explorer/store/reducer';
import pullRequest from './store/pull-request/reducer';
import options from './store/options/reducer';
import tree from './tree-view/store/tree/reducer';
import treeFilter from './store/tree-filter/reducer';

export default combineReducers({
    explorer,
    pullRequest,
    options,
    tree,
    treeFilter,
});