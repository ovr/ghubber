// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getRepositoryIssue } from 'github-flow-js';
import { REPOSITORY_ISSUE_REQUEST } from 'constants';
import { makeThunk } from 'utils/action-helper';

export function fetchIssue(owner: string, repo: string, id: number): ThunkAction {
    return makeThunk(
        () => getRepositoryIssue(owner, repo, id, {}),
        REPOSITORY_ISSUE_REQUEST
    );
}
