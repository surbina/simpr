import { repository } from '../github.helper';

export const FETCH_PR_DATA_REQUEST = 'SIMPR_FETCH_PR_DATA_REQUEST';
export const FETCH_PR_DATA_RESPONSE = 'SIMPR_FETCH_PR_DATA_RESPONSE';

export const FETCH_HEAD_REQUEST = 'SIMPR_FETCH_HEAD_REQUEST';
export const FETCH_HEAD_RESPONSE = 'SIMPR_FETCH_HEAD_RESPONSE';

export const FETCH_PR_FILES_REQUEST = 'SIMPR_FETCH_PR_FILES_REQUEST';
export const FETCH_PR_FILES_RESPONSE = 'SIMPR_FETCH_PR_FILES_RESPONSEs';

const fireFetchPRDataRequest = (prId) => ({
    type: FETCH_PR_DATA_REQUEST,
    payload: {
        prId,
    },
});

const fireFetchPRDataResponse = (prId) => ({
    type: FETCH_PR_DATA_RESPONSE,
    payload: {
        prId,
    },
});

const fireFetchHeadRequest = (prId) => ({
    type: FETCH_HEAD_REQUEST,
    payload: {
        prId,
    },
});

const fireFetchPRFilesRequest = (prId) => ({
    type: FETCH_PR_FILES_REQUEST,
    payload: {
        prId,
    },
});

const fireFetchPRFilesResponse = (prId, prFiles) => ({
    type: FETCH_PR_FILES_RESPONSE,
    payload: {
        prId,
        prFiles,
    },
});

const fireFetchHeadResponse = (treeData) => ({
    type: FETCH_HEAD_RESPONSE,
    payload: {
        treeData,
    },
});

export const fireFetchTree = (prId) =>
    (dispatch) => {
        dispatch(fireFetchPRDataRequest(prId));

        repository
            .getPullRequest(prId)
            .then((prData) => {
                dispatch(fireFetchPRDataResponse(prId));

                dispatch(fireFetchHead(prData.data.head.sha));
            });

        dispatch(fireFetchPRFiles(prId));
    };

export const fireFetchHead = (treeSha) =>
    (dispatch) => {
        dispatch(fireFetchHeadRequest(treeSha));

        // Adding the recursive flag at the end of the sha code
        // this should be removed if the api ever gets to support this feature
        repository
            .getTree(`${treeSha}?recursive=1`)
            .then((treeData) => {
                dispatch(fireFetchHeadResponse(treeData.data));
            });
    };

export const fireFetchPRFiles = (prId) =>
    (dispatch) => {
        dispatch(fireFetchPRFilesRequest(prId));

        repository
            .listPullRequestFiles(prId)
            .then((prFiles) => {
                dispatch(fireFetchPRFilesResponse(prId, prFiles.data));
            });
    };
