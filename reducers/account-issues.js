// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

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
import type { IssueEntity } from 'github-flow-js';

export type AccountIssuesType = 'created' | 'assigned' | 'mentioned';

export type AccountIssuesState = {
    type: AccountIssuesType,
    issues: Array<IssueEntity>|null,
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

const initialState: AccountIssuesState = {
    type: 'created',
    // By default, it's null, because need to show "You don't have any issues :)"
    issues: null,
    loading: false,
    hasMore: false,
    page: 1,
    infinityLoading: false,
    error: null,
}

export default (state: AccountIssuesState = initialState, action: Object): AccountIssuesState => {
    switch (action.type) {
        case ACCOUNT_ISSUES_REQUEST:
            return {
                ...initialState,
                issues: [],
                loading: true,
                error: null,
                type: action.payload
            }
        case ACCOUNT_ISSUES_SUCCESS: {
            const payload = action.payload;

            return {
                ...state,
                loading: false,
                hasMore: payload.data.items.length === ACCOUNT_ISSUES_LIMIT,
                issues: payload.data.items,
                type: payload.type,
            }
        }
        case ACCOUNT_ISSUES_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            }
        //
        case ACCOUNT_ISSUES_MORE_REQUEST:
            return {
                ...state,
                infinityLoading: true,
                type: action.payload
            }
        case ACCOUNT_ISSUES_MORE_SUCCESS: {
            const payload = action.payload;

            return {
                ...state,
                infinityLoading: false,
                issues: state.issues.concat(payload.data.items),
                hasMore: payload.data.items.length === ACCOUNT_ISSUES_LIMIT,
                type: payload.type,
                page: payload.page
            }
        }
        case ACCOUNT_ISSUES_MORE_FAIL:
            return {
                ...state,
                infinityLoading: false,
                error: 'Unknown error @todo'
            }
        //
        default:
            return state;
    }
}
