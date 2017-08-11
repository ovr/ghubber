// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

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
import type { IssueEntity } from 'github-flow-js';

export type AccountPullRequestsType = 'created' | 'assigned' | 'mentioned' | 'review-requested';

export type AccountPullRequestsState = {
    type: AccountPullRequestsType,
    pullRequests: Array<IssueEntity>|null,
    // first list fetch
    loading: boolean,
    // is infinity loading?
    infinityLoading: boolean,
    // should we try to load more issues?
    hasMore: boolean,
    // current page number
    page: number,
    error: Object|string|null,
}

const initialState: AccountPullRequestsState = {
    type: 'created',
    // By default, it's null, because need to show "You don't have any issues :)"
    pullRequests: null,
    loading: false,
    hasMore: false,
    page: 1,
    infinityLoading: false,
    error: null,
};

export default (state: AccountPullRequestsState = initialState, action: Object): AccountPullRequestsState => {
    switch (action.type) {
        case ACCOUNT_PULL_REQUESTS_REQUEST:
            return {
                ...initialState,
                issues: [],
                loading: true,
                error: null,
                type: action.payload
            };
        case ACCOUNT_PULL_REQUESTS_SUCCESS: {
            const payload = action.payload;

            return {
                ...state,
                loading: false,
                hasMore: payload.data.items.length === ACCOUNT_PULL_REQUESTS_LIMIT,
                pullRequests: payload.data.items,
                type: payload.type,
            };
        }
        case ACCOUNT_PULL_REQUESTS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            };
        //
        case ACCOUNT_PULL_REQUESTS_MORE_REQUEST:
            return {
                ...state,
                infinityLoading: true,
                type: action.payload
            };
        case ACCOUNT_PULL_REQUESTS_MORE_SUCCESS: {
            const payload = action.payload;

            return {
                ...state,
                infinityLoading: false,
                pullRequests: state.pullRequests.concat(payload.data.items),
                hasMore: payload.data.items.length === ACCOUNT_PULL_REQUESTS_LIMIT,
                type: payload.type,
                page: payload.page
            };
        }
        case ACCOUNT_PULL_REQUESTS_MORE_FAIL:
            return {
                ...state,
                infinityLoading: false,
                error: 'Unknown error @todo'
            };
        //
        default:
            return state;
    }
};
