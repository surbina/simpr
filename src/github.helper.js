import GitHub from 'github-api';
import locationHelper from './location.helper';

let instance;

export default class GitHubHelper {
    constructor(url, token){
        const repoData = locationHelper.getRepoData();

        if(instance){
            return instance;
        }

        if(url && token) {
            this.gitHub = new GitHub({ token }, `${url}/api/v3`);
        } else {
            this.gitHub = new GitHub();
        }

        this.repo = this.gitHub.getRepo(repoData.owner, repoData.repoName);

        instance = this;
    }

    repository() {
        return this.repo;
    }
}
