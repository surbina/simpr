import mapActionToReducer from 'redux-action-reducer-mapper';

import {
    FETCH_TREE_REQUEST,
    FETCH_TREE_RESPONSE,
} from './actions';

const TREE_STATUS_INITIAL = 'TREE_STATUS_INITIAL';
const TREE_STATUS_LOADING = 'TREE_STATUS_LOADING';
const TREE_STATUS_LOADED = 'TREE_STATUS_LOADED';

const INITIAL_STATE = {
    treeStatus: TREE_STATUS_INITIAL,
};

export default mapActionToReducer({
    default: INITIAL_STATE,
    [FETCH_TREE_REQUEST]: (state) => ({
        ...state,
        treeStatus: TREE_STATUS_LOADING,
    }),
    [FETCH_TREE_RESPONSE]: (state, action) => ({
        ...state,
        treeStatus: TREE_STATUS_LOADED,
        treeData: action.payload.treeData.tree,
    }),
});