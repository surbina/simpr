export const UPDATE_NODE_TOGGLE_STATUS = 'SIMPR_UPDATE_NODE_TOGGLE_STATUS';

export const fireUpdateNodeToggleStatus = (nodePath, nodeStatus) => ({
    type: UPDATE_NODE_TOGGLE_STATUS,
    payload: {
        nodePath,
        nodeStatus,
    }
});
