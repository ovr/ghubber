// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { searchIssues } from 'github-flow-js';
import {
    ACCOUNT_ISSUES_CREATED_REQUEST,
    ACCOUNT_ISSUES_CREATED_SUCCESS,
    ACCOUNT_ISSUES_CREATED_FAIL
} from 'constants';

export function fetchCreatedIssues(username: string) {
    return dispatch => {
        dispatch({
            type: ACCOUNT_ISSUES_CREATED_REQUEST
        });

        searchIssues({
            q: `is:open is:issue author:${username}`
        }).then(
            (user) => {
                dispatch({
                    type: ACCOUNT_ISSUES_CREATED_SUCCESS,
                    payload: user
                })
            },
            (error) => {
                dispatch({
                    type: ACCOUNT_ISSUES_CREATED_FAIL,
                    error: error
                })
            }
        )
    }
}
