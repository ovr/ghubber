// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getVersion } from 'react-native-device-info';
import { saveStoreKey } from 'utils';
import {
    LOGIN_REQUEST_SUCCESS,
    //
    APP_PROFILE_SUCCESS,
    APP_ORGANIZATIONS_SUCCESS,
    APP_LOGOUT_SUCCESS
} from 'constants';

// flow import
import type { UserEntity, OrganizationEntity, AuthorizationEntity } from 'github-flow-js';

// What method did we use on auth?
export type AUTH_METHOD = 'plain' | 'oauth';

export type AppState = {
    // What version we are used on authorization, we should store it for migration
    version: string,
    authMethod: AUTH_METHOD,
    user: UserEntity|null,
    authorization: AuthorizationEntity|null,
    organizations: Array<OrganizationEntity>|null
}

export type AuthAppState = AppState & {
    user: UserEntity
}

const initialState: AppState = {
    version: getVersion(),
    // let use plain as default
    authMethod: 'plain',
    user: null,
    authorization: null,
    organizations: null
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
        case APP_ORGANIZATIONS_SUCCESS: {
            const nextState = {
                ...state,
                organizations: action.payload
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
