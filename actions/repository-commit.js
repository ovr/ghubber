// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getRepositoryCommit } from 'github-flow-js';
import {
    REPOSITORY_COMMIT_REQUEST,
    REPOSITORY_COMMIT_REQUEST_SUCCESS,
    REPOSITORY_COMMIT_REQUEST_FAIL
} from 'constants';

export function fetchCommit(owner: string, repo: string, sha: string): ThunkAction {
    return async dispatch => {
        dispatch({
            type: REPOSITORY_COMMIT_REQUEST
        });

        try {
            const commit = await getRepositoryCommit(owner, repo, sha, {});

            dispatch({
                type: REPOSITORY_COMMIT_REQUEST_SUCCESS,
                payload: commit
            });
        } catch (e) {
            dispatch({
                type: REPOSITORY_COMMIT_REQUEST_FAIL
            })

            console.warn(e);
        }
    }
}
