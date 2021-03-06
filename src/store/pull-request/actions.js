import GitHubHelper from '../../github.helper';

export const FETCH_PR_DATA_REQUEST = 'SIMPR_FETCH_PR_DATA_REQUEST';
export const FETCH_PR_DATA_RESPONSE = 'SIMPR_FETCH_PR_DATA_RESPONSE';

export const FETCH_HEAD_REQUEST = 'SIMPR_FETCH_HEAD_REQUEST';
export const FETCH_HEAD_RESPONSE = 'SIMPR_FETCH_HEAD_RESPONSE';

export const FETCH_PR_FILES_REQUEST = 'SIMPR_FETCH_PR_FILES_REQUEST';
export const FETCH_PR_FILES_RESPONSE = 'SIMPR_FETCH_PR_FILES_RESPONSE';

const fireFetchPRDataRequest = (prId) => ({
    type: FETCH_PR_DATA_REQUEST,
    payload: {
        prId,
    },
});

const fireFetchPRDataResponse = (prRef, prHtmlUrl, prTitle, prId) => ({
    type: FETCH_PR_DATA_RESPONSE,
    payload: {
        prRef,
        prHtmlUrl,
        prTitle,
        prId,
    },
});

const fireFetchHeadRequest = (prId) => ({
    type: FETCH_HEAD_REQUEST,
    payload: {
        prId,
    },
});

const fireFetchHeadResponse = (treeData) => ({
    type: FETCH_HEAD_RESPONSE,
    payload: {
        treeData,
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

export const fireFetchTree = (prId, url, token) =>
    (dispatch) => {
        dispatch(fireFetchPRDataRequest(prId));
        const ghHelper = new GitHubHelper(url, token);

        ghHelper.repository()
            .getPullRequest(prId)
            .then((prData) => {
                const prHead = prData.data.head;
                dispatch(fireFetchPRDataResponse(prHead.ref, prHead.repo.html_url, prData.data.title, prId));

                dispatch(fireFetchHead(prHead.sha, url, token));
            });

        dispatch(fireFetchPRFiles(prId, url, token));
    };

export const fireFetchHead = (treeSha, url, token) =>
    (dispatch) => {
        dispatch(fireFetchHeadRequest(treeSha));

        const ghHelper = new GitHubHelper(url, token);
        // Adding the recursive flag at the end of the sha code
        // this should be removed if the api ever gets to support this feature
        ghHelper.repository()
            .getTree(`${treeSha}?recursive=1`)
            .then((treeData) => {
                dispatch(fireFetchHeadResponse(treeData.data));
            });
    };

export const fireFetchPRFiles = (prId, url, token) =>
    (dispatch) => {
        dispatch(fireFetchPRFilesRequest(prId));

        const ghHelper = new GitHubHelper(url, token);

        ghHelper.repository()
            .listPullRequestFiles(prId)
            .then((prFiles) => {
                dispatch(fireFetchPRFilesResponse(prId, prFiles.data));
            });
    };
