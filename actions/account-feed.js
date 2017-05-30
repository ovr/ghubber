// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getUserReceivedEvents } from 'github-flow-js';
import {
    ACCOUNT_FEED_REQUEST,
    ACCOUNT_FEED_SUCCESS,
    ACCOUNT_FEED_FAIL,
    //
    ACCOUNT_FEED_CHANGE_LOGIN,
    //
    ACCOUNT_FEED_LIMIT
} from 'constants';

export function fetchAccountFeed() {
    return (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_FEED_REQUEST
        });

        const state = getState();
        let login = getState().app.user.login;

        if (state.accountFeed.login) {
            login = state.accountFeed.login;
        }

        getUserReceivedEvents(login, { per_page: ACCOUNT_FEED_LIMIT }).then(
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

export function changeAccountFeedLogin(login: string) {
    return (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_FEED_CHANGE_LOGIN,
            payload: login
        });

        dispatch(fetchAccountFeed());
    }
}
