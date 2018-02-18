// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    ACCOUNT_NOTIFICATIONS_SYNC_START,
    ACCOUNT_NOTIFICATIONS_SYNC_PROGRESS,
    ACCOUNT_NOTIFICATIONS_SYNC_FINISH,
} from 'constants';

export type AccountNotificationsState = {
    // first list fetch
    loading: boolean,
    sync: boolean,
    error: Object|string|null,
}

const initialState: AccountNotificationsState = {
    loading: false,
    error: null,
};

export default (state: AccountNotificationsState = initialState, action: Object): AccountNotificationsState => {
    switch (action.type) {
        case ACCOUNT_NOTIFICATIONS_SYNC_START:
            return {
                ...initialState,
                sync: true,
                loading: true,
                error: null,
            };

        case ACCOUNT_NOTIFICATIONS_SYNC_PROGRESS: {
            return {
                ...state,
                sync: true,
                loading: false,
            };
        }

        case ACCOUNT_NOTIFICATIONS_SYNC_FINISH:
            return {
                ...state,
                sync: false,
                loading: false,
            };
        //
        default:
            return state;
    }
};
