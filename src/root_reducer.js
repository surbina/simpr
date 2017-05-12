import { combineReducers } from 'redux';

import explorer from './explorer/store/reducer';
import pullRequest from './store/pull-request/reducer';
import options from './store/options/reducer';

export default combineReducers({
    explorer,
    pullRequest,
    options,
});