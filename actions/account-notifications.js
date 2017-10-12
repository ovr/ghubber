// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getNotifications, getNotificationsParams } from 'github-flow-js';
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

function getNotificationsParamsByType(type: AccountNotificationsType): getNotificationsParams {
    switch (type) {
        case 'unread':
            // @todo?
            return {};
        case 'participating':
            return {
                participating: true
            };
        case 'all':
            return {
                all: true
            };
    }

    throw new Error(`Unsupported type ${type}`);
}

export function fetchNotifications(type: AccountNotificationsType): ThunkAction {
    return makeThunk(
        () => getNotifications({
            ...getNotificationsParamsByType(type),
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
            ...getNotificationsParamsByType(type),
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
