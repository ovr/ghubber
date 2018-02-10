// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getNotifications } from 'github-flow-js';
import {
    ACCOUNT_NOTIFICATIONS_REQUEST,
    ACCOUNT_NOTIFICATIONS_REQUEST_SUCCESS,
    //
    ACCOUNT_NOTIFICATIONS_LIMIT
} from 'constants';

import Realm from 'utils/realm';
import { paginate } from 'utils/paginate';

export function trySyncNotifications(): ThunkAction {
    return syncNotifications();
}

export function syncNotifications(): ThunkAction {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ACCOUNT_NOTIFICATIONS_REQUEST
        });

        const result = await paginate(
            async (page: number) => {
                return await getNotifications({
                    all: true,
                    per_page: ACCOUNT_NOTIFICATIONS_LIMIT,
                    page
                });
            },
            ACCOUNT_NOTIFICATIONS_LIMIT
        );

        console.log('syncNotifications', result);

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

        dispatch({
            type: ACCOUNT_NOTIFICATIONS_REQUEST_SUCCESS
        });
    };
}
