// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { deleteAuthorization, getOrganizationsByUsername } from 'github-flow-js';
import { Sentry } from 'react-native-sentry';

import { showLogin } from 'actions';
import {
    APP_ORGANIZATIONS_SUCCESS,
    APP_LOGOUT_SUCCESS
} from 'constants';

// import flow types
import type { AppState } from 'reducers/app';

export function logout() {
    return (dispatch, getState) => {
        const state: AppState = getState().app;

        deleteAuthorization(state.authorization.id, {}).then(
            () => {
                // @todo
            },
            (err) => console.warn(err)
        );

        dispatch({
            type: APP_LOGOUT_SUCCESS
        });

        dispatch(showLogin());
    }
}

export function initUser() {
    return (dispatch, getState) => {
        const state = getState();
        const user = state.app.user;

        Sentry.setUserContext({
            id: user.id,
            login: user.login
        });

        getOrganizationsByUsername(user.login, {}).then(
            (response) => {
                dispatch({
                    type: APP_ORGANIZATIONS_SUCCESS,
                    payload: response
                });
            },
            (response) => {
                // @todo
            }
        )
    }
}

export function initApp() {
    return (dispatch, getState) => {
        dispatch(initUser());
    }
}