export const UPDATE_TREE_FILTER = 'SIMPR_UPDATE_TREE_FILTER';

export const fireUpdateTreeFilter = (filter) => ({
    type: UPDATE_TREE_FILTER,
    payload: {
        filter
    },
});
