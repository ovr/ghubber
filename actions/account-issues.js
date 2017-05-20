// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { searchIssues } from 'github-flow-js';
import {
    ACCOUNT_ISSUES_CREATED_REQUEST,
    ACCOUNT_ISSUES_CREATED_SUCCESS,
    ACCOUNT_ISSUES_CREATED_FAIL
} from 'constants';

// import flow types
import type { AccountIssuesType } from 'reducers/account-issues';


function getSearchQByType(type: AccountIssuesType, username: string) {
    switch (type) {
        case 'created':
            return `is:open is:issue author:${username}`;
        case 'assigned':
            return `is:open is:issue assignee:${username}`;
        case 'mentioned':
            return `is:open is:issue mentions:${username}`;
    }
}

export function fetchIssues(username: string, type: AccountIssuesType) {
    return dispatch => {
        dispatch({
            type: ACCOUNT_ISSUES_CREATED_REQUEST,
            payload: type
        });

        searchIssues({
            q: `is:open is:issue author:${username}`
        }).then(
            (response) => {
                dispatch({
                    type: ACCOUNT_ISSUES_CREATED_SUCCESS,
                    payload: {
                        type: type,
                        data: response
                    }
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
