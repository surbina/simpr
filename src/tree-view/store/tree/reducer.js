import mapActionToReducer from 'redux-action-reducer-mapper';

import { UPDATE_NODE_TOGGLE_STATUS } from './actions';

const INITIAL_STATE = {};

export default mapActionToReducer({
    default: INITIAL_STATE,
    [UPDATE_NODE_TOGGLE_STATUS]: (state, action) => ({
        ...state,
        [action.payload.nodePath]: action.payload.nodeStatus,
    })
});
