import mapActionToReducer from 'redux-action-reducer-mapper';
import {
    TOGGLE_EXPLORER,
} from './actions';

const INITIAL_STATE = {
    isOpen: false,
};

export default mapActionToReducer({
    default: INITIAL_STATE,
    [TOGGLE_EXPLORER]: (state) => ({
        ...state,
        isOpen: !state.isOpen,
    }),
});