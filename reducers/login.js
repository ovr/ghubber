// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_2FA_REQUIRED,
    LOGIN_REQUEST_FAIL,
} from 'constants';

export type LoginState = {
    loading: boolean,
    twoFA: boolean,
    error: string|null
}

const initialState: LoginState = {
    loading: false,
    twoFA: false,
    error: null
}

export default (state: LoginState = initialState, action: Object): LoginState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case LOGIN_REQUEST_2FA_REQUIRED:
            return {
                ...state,
                twoFA: true,
                loading: false
            };
        case LOGIN_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: "Unknown"
            };
        default:
            return state;
    }
}
