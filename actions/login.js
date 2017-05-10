// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { showHome } from './navigation';
import { encode } from 'base-64';
import { createAuthorization, getUser } from 'github-flow-js';

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

export function makeLogin(username: string, password: string, code: string) {
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
                note: 'Ghubber ' + now
            },
            options
        );

        promise.then(
            (response: AuthorizationEntity) => {
                dispatch({
                    type: LOGIN_REQUEST_SUCCESS,
                    payload: response
                });

                const options = {
                    headers: {
                        Authorization: 'Token ' + response.token
                    }
                };

                const promise = getUser({}, options);

                promise.then(
                    (response) => {
                        dispatch({
                            type: APP_PROFILE_SUCCESS,
                            payload: response
                        });

                        dispatch(showHome());
                    },
                    (response) => {
                        dispatch({
                            type: LOGIN_REQUEST_FAIL
                        })
                    }
                )
            },
            (response) => {
                console.warn(response);
                
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

