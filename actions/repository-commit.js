// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getRepositoryCommit } from 'github-flow-js';
import { REPOSITORY_COMMIT_REQUEST } from 'constants';
import { makeThunk } from 'utils/action-helper';

export function fetchCommit(owner: string, repo: string, sha: string): ThunkAction {
    return makeThunk(
        () => getRepositoryCommit(owner, repo, sha, {}),
        REPOSITORY_COMMIT_REQUEST
    );
}
