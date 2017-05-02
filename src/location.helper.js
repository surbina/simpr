const getOwner = () => {
    const path = window.location.pathname.split('/');

    return path[1];
};

const getRepoName = () => {
    const path = window.location.pathname.split('/');

    return path[2];
};

const isPullRequest = () => {
    const path = window.location.pathname.split('/');

    return path[3] === 'pull';
};

const getPRNumber = () => {
    const path = window.location.pathname.split('/');

    return isPullRequest() ? path[4] : '';
}

const getRepoData = () => ({
    owner: getOwner(),
    repoName: getRepoName(),
    prNumber: getPRNumber(),
});

export default {
    getOwner,
    getRepoName,
    isPullRequest,
    getPRNumber,
    getRepoData,
};