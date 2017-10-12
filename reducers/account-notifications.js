// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    ACCOUNT_NOTIFICATIONS_REQUEST,
    ACCOUNT_NOTIFICATIONS_REQUEST_SUCCESS,
    ACCOUNT_NOTIFICATIONS_REQUEST_FAIL,
    //
    ACCOUNT_NOTIFICATIONS_MORE_REQUEST,
    ACCOUNT_NOTIFICATIONS_MORE_REQUEST_SUCCESS,
    ACCOUNT_NOTIFICATIONS_MORE_REQUEST_FAIL,
    //
    ACCOUNT_PULL_REQUESTS_LIMIT
} from 'constants';

// import flow types
import type { NotificationEntity } from 'github-flow-js';

export type AccountNotificationsType = 'unread' | 'participating' | 'all';

export type AccountNotificationsState = {
    type: AccountNotificationsType,
    items: Array<NotificationEntity>|null,
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

const initialState: AccountNotificationsState = {
    type: 'participating',
    // By default, it's null, because need to show "You don't have any events :)"
    items: null,
    loading: false,
    hasMore: false,
    page: 1,
    infinityLoading: false,
    error: null,
};

type SectionListData = Array<{data: Array<any>}>;
type SectionListGroupIndex = { [string]: number };

function getGroupIndex(input: Array<Object>): SectionListGroupIndex {
    const indexes: SectionListGroupIndex = {};

    input.forEach(
        (group, index) => {
            indexes[group.title] = index;
        }
    );

    return indexes;
}

function groupForSectionList(
    input: Array<Object>,
    indexes: SectionListGroupIndex = {},
    result: SectionListData = []
): Array<{data: Array<any>}> {
    input.forEach(
        (element) => {
            const key = element.repository.full_name;

            if (indexes.hasOwnProperty(key)) {
                const index: number = indexes[key];

                result[index].data.push(element);
            } else{
                indexes[key] = result.length;

                result.push({
                    data: [
                        element
                    ],
                    title: key
                });
            }
        }
    );

    return result;
}

export default (state: AccountNotificationsState = initialState, action: Object): AccountNotificationsState => {
    switch (action.type) {
        case ACCOUNT_NOTIFICATIONS_REQUEST:
            return {
                ...initialState,
                items: [],
                loading: true,
                error: null,
                type: action.payload
            };
        case ACCOUNT_NOTIFICATIONS_REQUEST_SUCCESS: {
            const payload = action.payload;

            return {
                ...state,
                loading: false,
                hasMore: payload.data.length === ACCOUNT_PULL_REQUESTS_LIMIT,
                items: groupForSectionList(payload.data),
                type: payload.type,
            };
        }
        case ACCOUNT_NOTIFICATIONS_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            };
        //
        case ACCOUNT_NOTIFICATIONS_MORE_REQUEST:
            return {
                ...state,
                infinityLoading: true,
                type: action.payload
            };
        case ACCOUNT_NOTIFICATIONS_MORE_REQUEST_SUCCESS: {
            const payload = action.payload;

            return {
                ...state,
                infinityLoading: false,
                items: groupForSectionList(
                    payload.data,
                    getGroupIndex(state.items),
                    state.items
                ),
                hasMore: payload.data.length === ACCOUNT_PULL_REQUESTS_LIMIT,
                type: payload.type,
                page: payload.page
            };
        }
        case ACCOUNT_NOTIFICATIONS_MORE_REQUEST_FAIL:
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
