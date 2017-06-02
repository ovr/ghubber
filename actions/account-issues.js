// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { searchIssues } from 'github-flow-js';
import {
    ACCOUNT_ISSUES_REQUEST,
    ACCOUNT_ISSUES_SUCCESS,
    ACCOUNT_ISSUES_FAIL,
    //
    ACCOUNT_ISSUES_MORE_REQUEST,
    ACCOUNT_ISSUES_MORE_SUCCESS,
    ACCOUNT_ISSUES_MORE_FAIL,
    //
    ACCOUNT_ISSUES_LIMIT
} from 'constants';

// import flow types
import type { AccountIssuesType } from 'reducers/account-issues';

function getSearchQByType(type: AccountIssuesType, username: string): string {
    switch (type) {
        case 'created':
            return `is:open is:issue author:${username}`;
        case 'assigned':
            return `is:open is:issue assignee:${username}`;
        case 'mentioned':
            return `is:open is:issue mentions:${username}`;
    }

    throw new Error('Unexpected type');
}

export function fetchIssues(username: string, type: AccountIssuesType): ThunkAction {
    return dispatch => {
        dispatch({
            type: ACCOUNT_ISSUES_REQUEST,
            payload: type
        });

        searchIssues({
            q: getSearchQByType(type, username),
            per_page: ACCOUNT_ISSUES_LIMIT
        }).then(
            (response) => {
                dispatch({
                    type: ACCOUNT_ISSUES_SUCCESS,
                    payload: {
                        type: type,
                        data: response
                    }
                })
            },
            (error) => {
                dispatch({
                    type: ACCOUNT_ISSUES_FAIL,
                    error: error
                })
            }
        )
    }
}

export function fetchMoreIssues(username: string, page: number, type: AccountIssuesType): ThunkAction {
    return dispatch => {
        dispatch({
            type: ACCOUNT_ISSUES_MORE_REQUEST,
            payload: type
        });

        searchIssues({
            q: getSearchQByType(type, username),
            per_page: ACCOUNT_ISSUES_LIMIT,
            page: page
        }).then(
            (response) => {
                dispatch({
                    type: ACCOUNT_ISSUES_MORE_SUCCESS,
                    payload: {
                        type: type,
                        page: page,
                        data: response
                    }
                })
            },
            (error) => {
                dispatch({
                    type: ACCOUNT_ISSUES_MORE_FAIL,
                    error: error
                })
            }
        )
    }
}
