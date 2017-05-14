import mapActionToReducer from 'redux-action-reducer-mapper';

import { UPDATE_TREE_FILTER } from './actions';

const INITIAL_STATE = {
    showOnlyModifiedFiles: true,
};

export default mapActionToReducer({
    default: INITIAL_STATE,
    [UPDATE_TREE_FILTER]: (state, action) => ({
        ...state,
        ...action.payload.filter,
    }),
});
