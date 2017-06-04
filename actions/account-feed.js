// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getUserReceivedEvents, getOrganizationUserEvents } from 'github-flow-js';
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
    ACCOUNT_FEED_LIMIT
} from 'constants';

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
    return (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_FEED_REQUEST
        });

        fetchFeed(getState(), 1).then(
            (response) => {
                dispatch({
                    type: ACCOUNT_FEED_SUCCESS,
                    payload: response
                })
            },
            (error) => {
                dispatch({
                    type: ACCOUNT_FEED_FAIL,
                    error: error
                })
            }
        )
    }
}

export function fetchMoreAccountFeed(): ThunkAction {
    return (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_FEED_INFINITY_REQUEST
        });

        const page = getState().accountFeed.page + 1;

        fetchFeed(getState(), page).then(
            (response) => {
                dispatch({
                    type: ACCOUNT_FEED_INFINITY_SUCCESS,
                    payload: response
                })
            },
            (error) => {
                dispatch({
                    type: ACCOUNT_FEED_INFINITY_FAIL,
                    error: error
                })
            }
        )
    }
}

export function changeAccountFeedLogin(login: string): ThunkAction {
    return dispatch => {
        dispatch({
            type: ACCOUNT_FEED_CHANGE_LOGIN,
            payload: login
        });

        dispatch(fetchAccountFeed());
    }
}
