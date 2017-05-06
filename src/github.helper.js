import GitHub from 'github-api';
import locationHelper from './location.helper';

// for GHE provide token and api end point
const repoData = locationHelper.getRepoData();
const gh = new GitHub();
const repository = gh.getRepo(repoData.owner, repoData.repoName);

export {
    repository,
};