// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getUserReceivedEvents, getOrganizationUserEvents } from 'github-flow-js';
import {
    ACCOUNT_FEED_REQUEST,
    //
    ACCOUNT_FEED_INFINITY_REQUEST,
    //
    ACCOUNT_FEED_CHANGE_LOGIN,
    //
    ACCOUNT_FEED_LIMIT
} from 'constants';
import { makeThunk } from 'utils/action-helper';

function fetchFeed(state: State, page: number = 1): Promise<any> {
    // login of the user, who use app
    const identityLogin = state.app.user.login;

    // selected "login", can be similar to identityLogin or any user's organization login
    const selectedLogin = state.accountFeed.login;

    if (selectedLogin && selectedLogin !== identityLogin) {
        // This is needed to get private events for Organization
        return getOrganizationUserEvents(identityLogin, selectedLogin, { page: page, per_page: ACCOUNT_FEED_LIMIT });
    }

    return getUserReceivedEvents(identityLogin, { page: page, per_page: ACCOUNT_FEED_LIMIT });
}

export function fetchAccountFeed(): ThunkAction {
    return makeThunk(
        (state) => fetchFeed(state, 1),
        ACCOUNT_FEED_REQUEST
    );
}

export function fetchMoreAccountFeed(): ThunkAction {
    return makeThunk(
        (state) => fetchFeed(state, state.accountFeed.page + 1),
        ACCOUNT_FEED_INFINITY_REQUEST
    );
}

export function changeAccountFeedLogin(login: string): ThunkAction {
    return dispatch => {
        dispatch({
            type: ACCOUNT_FEED_CHANGE_LOGIN,
            payload: login
        });

        dispatch(fetchAccountFeed());
    };
}
