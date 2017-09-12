// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getNotifications } from 'github-flow-js';
import {
    ACCOUNT_NOTIFICATIONS_REQUEST,
    ACCOUNT_NOTIFICATIONS_REQUEST_SUCCESS,
    //
    ACCOUNT_NOTIFICATIONS_MORE_REQUEST,
    ACCOUNT_NOTIFICATIONS_MORE_REQUEST_SUCCESS,
    //
    ACCOUNT_NOTIFICATIONS_LIMIT
} from 'constants';
import { makeThunk } from 'utils/action-helper';

// import flow types
import type { AccountNotificationsType } from 'reducers/account-notifications';

export function fetchNotifications(type: AccountNotificationsType): ThunkAction {
    return makeThunk(
        () => getNotifications({
            per_page: ACCOUNT_NOTIFICATIONS_LIMIT
        }),
        ACCOUNT_NOTIFICATIONS_REQUEST,
        (result, dispatch) => dispatch({
            type: ACCOUNT_NOTIFICATIONS_REQUEST_SUCCESS,
            payload: {
                type: type,
                data: result
            }
        })
    );
}

export function fetchMoreNotifications(page: number, type: AccountNotificationsType): ThunkAction {
    return makeThunk(
        () => getNotifications({
            per_page: ACCOUNT_NOTIFICATIONS_LIMIT,
            page: page
        }),
        ACCOUNT_NOTIFICATIONS_MORE_REQUEST,
        (response, dispatch) => dispatch({
            type: ACCOUNT_NOTIFICATIONS_MORE_REQUEST_SUCCESS,
            payload: {
                type: type,
                page: page,
                data: response
            }
        })
    );
}
