// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { showHome } from './navigation';
import { encode } from 'base-64';
import { createAuthorization, getUser } from 'github-flow-js';
import { initUser } from 'actions';

import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAIL,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_2FA_REQUIRED,
    //
    APP_PROFILE_SUCCESS
} from 'constants';

// import flow types
import type { AuthorizationEntity } from 'github-flow-js';

export function makeOAuthLogin(accessToken: string): ThunkAction {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            payload: {
                authMethod: 'oauth',
                authorization: {
                    token: accessToken
                }
            }
        });

        const options = {
            headers: {
                Authorization: 'Token ' + accessToken
            }
        };

        getUser({}, options).then(
            (response) => {
                dispatch({
                    type: APP_PROFILE_SUCCESS,
                    payload: response
                });

                dispatch(initUser());
                dispatch(showHome());
            },
            (error) => {
                dispatch({
                    type: LOGIN_REQUEST_FAIL,
                    error
                })

                console.warn(error);
                console.warn(error.clone().text());
            }
        )
    }
}

export function makeLogin(username: string, password: string, code: string): ThunkAction {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        })

        let options = {
            headers: {
                Authorization: 'Basic ' + encode(username + ':' + password)
            }
        };

        if (code) {
            options.headers = {
                ...options.headers,
                "X-GitHub-OTP": code
            }
        }

        const now = new Date();

        const promise = createAuthorization(
            {
                note: 'Ghubber ' + now,
                scopes: [
                    // user
                    "user",
                    "public_repo",
                    "repo",
                    "notifications"
                ]
            },
            options
        );

        promise.then(
            (response: AuthorizationEntity) => {
                dispatch({
                    type: LOGIN_REQUEST_SUCCESS,
                    payload: {
                        authMethod: 'plain',
                        authorization: response
                    }
                });

                const options = {
                    headers: {
                        Authorization: 'Token ' + response.token
                    }
                };

                getUser({}, options).then(
                    (response) => {
                        dispatch({
                            type: APP_PROFILE_SUCCESS,
                            payload: response
                        });

                        dispatch(initUser());
                        dispatch(showHome());
                    },
                    (error) => {
                        dispatch({
                            type: LOGIN_REQUEST_FAIL,
                            error
                        })
                    }
                )
            },
            (response) => {
                console.warn(response);
                console.warn(response.clone().json());

                if (response && response.headers) {
                    const headers: Headers = response.headers;

                    if (headers.get("x-github-otp")) {
                        dispatch({
                            type: LOGIN_REQUEST_2FA_REQUIRED
                        })

                        return;
                    }
                }

                dispatch({
                    type: LOGIN_REQUEST_FAIL
                })
            }
        )
    }
}

