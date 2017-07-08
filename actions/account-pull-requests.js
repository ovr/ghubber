// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { searchIssues } from 'github-flow-js';
import {
    ACCOUNT_PULL_REQUESTS_REQUEST,
    ACCOUNT_PULL_REQUESTS_SUCCESS,
    ACCOUNT_PULL_REQUESTS_FAIL,
    //
    ACCOUNT_PULL_REQUESTS_MORE_REQUEST,
    ACCOUNT_PULL_REQUESTS_MORE_SUCCESS,
    ACCOUNT_PULL_REQUESTS_MORE_FAIL,
    //
    ACCOUNT_PULL_REQUESTS_LIMIT
} from 'constants';

// import flow types
import type { AccountPullRequestsType } from 'reducers/account-pull-requests';

function getSearchQByType(type: AccountPullRequestsType, username: string): string {
    switch (type) {
        case 'created':
            return `is:open is:pr author:${username}`;
        case 'assigned':
            return `is:open is:pr assignee:${username}`;
        case 'mentioned':
            return `is:open is:pr mentions:${username}`;
        case 'review-requested':
            return `is:open is:pr review-requested:${username}`;
    }

    throw new Error('Unexpected type');
}

export function fetchPullRequests(username: string, type: AccountPullRequestsType): ThunkAction {
    return dispatch => {
        dispatch({
            type: ACCOUNT_PULL_REQUESTS_REQUEST,
            payload: type
        });

        searchIssues({
            q: getSearchQByType(type, username),
            per_page: ACCOUNT_PULL_REQUESTS_LIMIT
        }).then(
            (response) => {
                dispatch({
                    type: ACCOUNT_PULL_REQUESTS_SUCCESS,
                    payload: {
                        type: type,
                        data: response
                    }
                })
            },
            (error) => {
                dispatch({
                    type: ACCOUNT_PULL_REQUESTS_FAIL,
                    error: error
                })
            }
        )
    }
}

export function fetchMorePullRequests(username: string, page: number, type: AccountPullRequestsType): ThunkAction {
    return dispatch => {
        dispatch({
            type: ACCOUNT_PULL_REQUESTS_MORE_REQUEST,
            payload: type
        });

        searchIssues({
            q: getSearchQByType(type, username),
            per_page: ACCOUNT_PULL_REQUESTS_LIMIT,
            page: page
        }).then(
            (response) => {
                dispatch({
                    type: ACCOUNT_PULL_REQUESTS_MORE_SUCCESS,
                    payload: {
                        type: type,
                        page: page,
                        data: response
                    }
                })
            },
            (error) => {
                dispatch({
                    type: ACCOUNT_PULL_REQUESTS_MORE_FAIL,
                    error: error
                })
            }
        )
    }
}
