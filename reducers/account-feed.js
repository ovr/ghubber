// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    ACCOUNT_FEED_REQUEST,
    ACCOUNT_FEED_SUCCESS,
    ACCOUNT_FEED_FAIL,
    //
    ACCOUNT_FEED_LIMIT
} from 'constants';

// import flow types
import type { IssueEntity } from 'github-flow-js';

export type AccountFeedState = {
    events: Array<Object>|null,
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

const initialState: AccountFeedState = {
    events: null,
    loading: false,
    hasMore: false,
    page: 1,
    infinityLoading: false,
    error: null,
}

export default (state: AccountFeedState = initialState, action: Object): AccountFeedState => {
    switch (action.type) {
        case ACCOUNT_FEED_REQUEST:
            return {
                ...initialState,
                events: [],
                loading: true,
                error: null,
                type: action.payload
            }
        case ACCOUNT_FEED_SUCCESS: {
            const payload = action.payload;

            return {
                ...state,
                loading: false,
                hasMore: payload.length === ACCOUNT_FEED_LIMIT,
                events: payload
            }
        }
        case ACCOUNT_FEED_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            }
        default:
            return state;
    }
}
