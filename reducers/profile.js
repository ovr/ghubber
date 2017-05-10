// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    PROFILE_REQUEST,
    PROFILE_REQUEST_SUCCESS,
    PROFILE_REQUEST_FAIL
} from 'constants';

// import flow types
import type { UserEntity } from 'github-flow-js';

type ProfileState = {
    loading: boolean,
    error: Object|null,
    user: UserEntity|null
}

const initialState: ProfileState = {
    loading: false,
    error: null,
    user: null
}

export default (state: ProfileState = initialState, action: Object): ProfileState => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return {
                ...state,
                user: null,
                loading: true,
                error: null
            }
        case PROFILE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case PROFILE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}
