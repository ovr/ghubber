// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    ACCOUNT_FEED_REQUEST,
    ACCOUNT_FEED_SUCCESS,
    ACCOUNT_FEED_FAIL,
    //
    ACCOUNT_FEED_INFINITY_REQUEST,
    ACCOUNT_FEED_INFINITY_SUCCESS,
    ACCOUNT_FEED_INFINITY_FAIL,
    //
    ACCOUNT_FEED_CHANGE_LOGIN,
    //
    APP_LOGOUT_SUCCESS,
    //
    ACCOUNT_FEED_LIMIT
} from 'constants';

import { saveStoreKey } from 'utils';

export type AccountFeedState = {
    events: Array<Object>|null,
    login: string|null,
    // first list fetch
    loading: boolean,
    // is infinity loading?
    infinity: boolean,
    // should we try to load more issues?
    hasMore: boolean,
    // current page number
    page: number,
    error: Object|string|null,
}

const initialState: AccountFeedState = {
    events: null,
    login: null,
    loading: false,
    hasMore: false,
    page: 1,
    infinity: false,
    error: null,
}

export default (state: AccountFeedState = initialState, action: Object): AccountFeedState => {
    switch (action.type) {
        case ACCOUNT_FEED_CHANGE_LOGIN:
            return {
                ...initialState,
                login: action.payload
            }
        // Infinity
        case ACCOUNT_FEED_INFINITY_REQUEST:
            return {
                ...state,
                infinity: true
            }
        case ACCOUNT_FEED_INFINITY_SUCCESS: {
            const payload = action.payload;

            const nextState = {
                ...state,
                infinity: false,
                hasMore: payload.length === ACCOUNT_FEED_LIMIT,
                page: state.page + 1,
                // Possible this can be null but...
                events: state.events ? state.events.concat(payload) : state.events
            }

            saveStoreKey('state:account-feed', nextState);

            return nextState;
        }
        case ACCOUNT_FEED_INFINITY_FAIL:
            return {
                ...state,
                infinity: false
            }
        // Loading
        case ACCOUNT_FEED_REQUEST:
            return {
                ...state,
                // events: [],
                // loading: true,
                page: 1,
                error: null
            }
        case ACCOUNT_FEED_SUCCESS: {
            const payload = action.payload;

            const nextState = {
                ...state,
                loading: false,
                hasMore: payload.length === ACCOUNT_FEED_LIMIT,
                events: payload
            }

            saveStoreKey('state:account-feed', nextState);

            return nextState;
        }
        case ACCOUNT_FEED_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            }
        //
        case APP_LOGOUT_SUCCESS: {
            saveStoreKey('state:account-feed', initialState);

            return initialState;
        }
        default:
            return state;
    }
}
