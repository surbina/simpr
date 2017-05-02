import GitHub from 'github-api';
import locationHelper from '../location.helper';

export const FETCH_TREE_REQUEST = 'SIMPR_FETCH_TREE_REQUEST';
export const FETCH_TREE_RESPONSE = 'SIMPR_FETCH_TREE_RESPONSE';

export const FETCH_PR_FILES_REQUEST = 'SIMPR_FETCH_PR_FILES_REQUEST';
export const FETCH_PR_FILES_RESPONSE = 'SIMPR_FETCH_PR_FILES_RESPONSEs';

const fireFetchTreeRequest = (prId) => ({
    type: FETCH_TREE_REQUEST,
    payload: {
        prId,
    },
});

const fireFetchTreeResponse = (treeData) => ({
    type: FETCH_TREE_RESPONSE,
    payload: {
        treeData,
    },
});

export const fireFetchTree = (prId) =>
    (dispatch) => {
        dispatch(fireFetchTreeRequest(prId));

        // for GHE provide token and api end point
        const gh = new GitHub();
        const repoData = locationHelper.getRepoData();

        const repo = gh.getRepo(repoData.owner, repoData.repoName);

        repo
            .getPullRequest(repoData.prNumber)
            .then((prData) => {

                repo
                    // Adding the recursive flag at the end of the sha code
                    // this should be removed if the api ever gets to support this feature
                    .getTree(`${prData.data.head.sha}?recursive=1`)
                    .then((treeData) => {
                        dispatch(fireFetchTreeResponse(treeData.data));
                    });
            });
    };
