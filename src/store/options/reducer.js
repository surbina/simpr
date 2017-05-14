import { get } from 'lodash';
import mapActionToReducer from 'redux-action-reducer-mapper';

import {
    FETCH_OPTIONS_REQUEST,
    FETCH_OPTIONS_RESPONSE,
} from './actions';

const INITIAL_STATE = {
    loaded: false,
};

export default mapActionToReducer({
    default: INITIAL_STATE,

    [FETCH_OPTIONS_REQUEST]: (state) => ({
        ...state,
        loaded: false,
    }),

    [FETCH_OPTIONS_RESPONSE]: (state, action) => ({
        ...state,
        loaded: true,
        url: get(action.payload.permissions, [`${location.protocol}//${location.host}`, 'url'], ''),
        token: get(action.payload.permissions, [`${location.protocol}//${location.host}`, 'token'], ''),
    }),
});
