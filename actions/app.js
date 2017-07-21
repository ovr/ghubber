// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { deleteAuthorization, getUserOrganizations } from 'github-flow-js';
import { Sentry } from 'react-native-sentry';

import { showLogin } from 'actions';
import {
    APP_ORGANIZATIONS_SUCCESS,
    APP_LOGOUT_SUCCESS
} from 'constants';

// import flow types
import type { AppState } from 'reducers/app';

export function logout(): ThunkAction {
    return (dispatch, getState) => {
        const state: AppState = getState().app;

        const finishCB = () => {
            dispatch({
                type: APP_LOGOUT_SUCCESS
            });

            dispatch(showLogin());
        }

        if (state.authorization) {
            if (state.authorization.method && state.authorization.method === 'plain') {
                deleteAuthorization(state.authorization.id, {}).then(
                    () => finishCB(),
                    (err) => console.warn(err)
                );
            } else {
                // @todo Implement deletion of OAuth token?
                finishCB();
            }
        } else {
            finishCB();
        }
    }
}

export function initUser(): ThunkAction {
    return (dispatch, getState) => {
        const state = getState();
        const user = state.app.user;

        // eslint-disable-next-line no-undef
        if (SENTRY_ENABLED) {
            Sentry.setUserContext({
                userID: user.id + "",
                username: user.login,
                email: user.email
            });
        }

        getUserOrganizations({}).then(
            (response) => {
                dispatch({
                    type: APP_ORGANIZATIONS_SUCCESS,
                    payload: response
                });
            },
            (error) => {
                console.warn(error);
            }
        )
    }
}

export function initApp(): ThunkAction {
    return dispatch => {
        dispatch(initUser());
    }
}
