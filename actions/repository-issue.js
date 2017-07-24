// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getRepositoryIssue } from 'github-flow-js';
import {
    REPOSITORY_ISSUE_REQUEST,
    REPOSITORY_ISSUE_REQUEST_FAIL,
    REPOSITORY_ISSUE_REQUEST_SUCCESS
} from 'constants';

export function fetchIssue(owner: string, repo: string, number: number): ThunkAction {
    return async dispatch => {
        dispatch({
            type: REPOSITORY_ISSUE_REQUEST
        });

        try {
            const commit = await getRepositoryIssue(owner, repo, number, {});

            dispatch({
                type: REPOSITORY_ISSUE_REQUEST_FAIL,
                payload: commit
            });
        } catch (e) {
            dispatch({
                type: REPOSITORY_ISSUE_REQUEST_SUCCESS
            })

            console.warn(e);
        }
    }
}
