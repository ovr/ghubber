// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { saveStoreKey } from 'utils';
import {
    LOGIN_REQUEST_SUCCESS,
    //
    APP_PROFILE_SUCCESS,
    APP_LOGOUT_SUCCESS
} from 'constants';

// flow import
import type { UserEntity, AuthorizationEntity } from 'github-flow-js';

export type AppState = {
    user: UserEntity|null,
    authorization: AuthorizationEntity|null
}

const initialState: AppState = {
    user: null,
    authorization: null
}

export default (state: AppState = initialState, action: Object): AppState => {
    switch (action.type) {
        case LOGIN_REQUEST_SUCCESS: {
            const nextState = {
                ...state,
                authorization: action.payload
            };

            saveStoreKey('state:app', nextState);

            return nextState;
        }
        case APP_PROFILE_SUCCESS: {
            const nextState = {
                ...state,
                user: action.payload
            };

            saveStoreKey('state:app', nextState);

            return nextState;
        }
        case APP_LOGOUT_SUCCESS: {
            saveStoreKey('state:app', initialState);

            return initialState;
        }
        default:
            return state;
    }
}
