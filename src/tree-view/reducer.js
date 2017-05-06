import { reduce } from 'lodash';
import mapActionToReducer from 'redux-action-reducer-mapper';

import {
    FETCH_HEAD_REQUEST,
    FETCH_HEAD_RESPONSE,
    FETCH_PR_FILES_REQUEST,
    FETCH_PR_FILES_RESPONSE,
} from './actions';

const TREE_STATUS_INITIAL = 'TREE_STATUS_INITIAL';
const TREE_STATUS_LOADING = 'TREE_STATUS_LOADING';
const TREE_STATUS_LOADED = 'TREE_STATUS_LOADED';

const PR_FILES_STATUS_INITIAL = 'PR_FILES_STATUS_INITIAL';
const PR_FILES_STATUS_LOADING = 'PR_FILES_STATUS_LOADING';
const PR_FILES_STATUS_LOADED = 'PR_FILES_STATUS_LOADED';

const INITIAL_STATE = {
    treeStatus: TREE_STATUS_INITIAL,
    prFilesStatus: PR_FILES_STATUS_INITIAL,
};

export default mapActionToReducer({
    default: INITIAL_STATE,
    [FETCH_HEAD_REQUEST]: (state) => ({
        ...state,
        treeStatus: TREE_STATUS_LOADING,
    }),
    [FETCH_HEAD_RESPONSE]: (state, action) => ({
        ...state,
        treeStatus: TREE_STATUS_LOADED,
        treeData: action.payload.treeData.tree,
    }),
    [FETCH_PR_FILES_REQUEST]: (state) => ({
        ...state,
        prFilesStatus: PR_FILES_STATUS_LOADING,
    }),
    [FETCH_PR_FILES_RESPONSE]: (state, action) => ({
        ...state,
        prFiles: reduce(action.payload.prFiles, (acc, file) => { acc[file.filename] = file; return acc; }, {}),
    }),
});
