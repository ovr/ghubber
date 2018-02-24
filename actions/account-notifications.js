// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getNotifications } from 'github-flow-js';
import {
    ACCOUNT_NOTIFICATIONS_SYNC_START,
    ACCOUNT_NOTIFICATIONS_SYNC_PROGRESS,
    ACCOUNT_NOTIFICATIONS_SYNC_FINISH,
    //
    ACCOUNT_NOTIFICATIONS_LIMIT
} from 'constants';

import Realm from 'utils/realm';
import { paginateBySlice } from 'utils/paginate';

export function trySyncNotifications(): ThunkAction {
    return (dispatch: Dispatch) => {
        dispatch(syncNotifications());
    };
}

export function syncNotifications(): ThunkAction {
    return async (dispatch: Dispatch, getState: GetState) => {
        const state = getState();

        if (state.accountNotifications && state.accountNotifications.sync) {
            return;
        }

        dispatch({
            type: ACCOUNT_NOTIFICATIONS_SYNC_START
        });

        await paginateBySlice(
            (page: number) => {
                return getNotifications({
                    all: true,
                    per_page: ACCOUNT_NOTIFICATIONS_LIMIT,
                    page
                });
            },
            ACCOUNT_NOTIFICATIONS_LIMIT,
            function (result, page) {
                dispatch({
                    type: ACCOUNT_NOTIFICATIONS_SYNC_PROGRESS,
                    payload: page
                });

                Realm.write(
                    () => {
                        result.forEach(
                            (notification) => {
                                console.log('persist notification', notification);

                                Realm.create('Notification', {
                                    id: notification.id,
                                    unread: notification.unread,
                                    reason: notification.reason,
                                    subject: notification.subject,
                                    repository: notification.repository,
                                    updated_at: notification.updated_at,
                                }, true);
                            }
                        );
                    }
                );
            }
        );

        dispatch({
            type: ACCOUNT_NOTIFICATIONS_SYNC_FINISH
        });
    };
}
