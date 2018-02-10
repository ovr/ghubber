// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    ACCOUNT_NOTIFICATIONS_REQUEST,
    ACCOUNT_NOTIFICATIONS_REQUEST_SUCCESS,
    ACCOUNT_NOTIFICATIONS_REQUEST_FAIL,
} from 'constants';

export type AccountNotificationsState = {
    // first list fetch
    loading: boolean,
    error: Object|string|null,
}

const initialState: AccountNotificationsState = {
    loading: false,
    error: null,
};

export default (state: AccountNotificationsState = initialState, action: Object): AccountNotificationsState => {
    switch (action.type) {
        case ACCOUNT_NOTIFICATIONS_REQUEST:
            return {
                ...initialState,
                loading: true,
                error: null,
            };
        case ACCOUNT_NOTIFICATIONS_REQUEST_SUCCESS: {
            return {
                ...state,
                loading: false,
            };
        }
        case ACCOUNT_NOTIFICATIONS_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            };
        //
        default:
            return state;
    }
};
